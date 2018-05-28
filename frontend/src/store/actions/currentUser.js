
import { SET_CURRENT_USER, URLBASE } from './constants'


const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: { user }
});

export const login = (data) => (dispatch) => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json'
  });
  let config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  };

 return fetch(`${URLBASE}/api/token/`, config)
        .then(res => {
          if(res.status === 400) {
            throw new Error 
          } else {
            return res.json()
          }
        })
        .then(user => {
          const action = setCurrentUser(user);
          dispatch(action);
          localStorage.setItem('access_token', user.access);
          localStorage.setItem('refresh_token', user.refresh);
          return 1;
        })
        .catch(err => {
          return 2;
        })
}
