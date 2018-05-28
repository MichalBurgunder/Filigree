
// import { VERIFY_TOKEN, URLBASE } from './constants'
// import {store} from '../index'

// export const actionVerifyToken = (data) => ({
//     type: VERIFY_TOKEN,
//     payload: { data }
// });


// export const verifyToken = () => {
//     const tokenString = localStorage.getItem("token")
//     const myHeaders = new Headers({
//         "Authorization": `Bearer ${token}`
//     });
//     const token = {token: tokenString}
//     console.log(token)
//     let config = {
//         method: "POST",
//         // headers: myHeaders,
//         body: JSON.stringify(token)
//     }
//     console.log(myHeaders)

//     fetch(`${URLBASE}/api/token/verify/`, config)
//         .then(response => response.json())
//         .then(data => {
//             console.log('We got this: ', data)
//             const verification_token = actionVerifyToken(data);
//             store.dispatch(verification_token)
//         })
// }
