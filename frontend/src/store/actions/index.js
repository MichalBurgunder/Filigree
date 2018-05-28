import {
  URLBASE,
  REGISTER_VALIDATE,
  RESET_PASSWORD
} from './constants';


export const loginAction = (data) => {
  return {
    type: 'LOGIN',
    payload: data,
  }
}

export const registerAction = (data) => {
  return {
    type: 'REGISTER',
    payload: data
  }
}
export const setToken = (data) => {
  return {
    type: 'SET_TOKEN',
    payload: data
  }
}

export const regististration_validation = (data) => {
  return {
    type: 'REGISTER_VALIDATION',
    payload: data
  }
}

export const fetchHistoryAction = (data) => ({
  type: "HISTORY_FETCHED",
  payload: data
})

export const fetchBatchesAction = (data) => ({
  type: "BATCHES_FETCHED",
  payload: data
})

export const fetchTextsAction = (data) => ({
  type: "TEXTS_FETCHED",
  payload: data
})
export const newTextsAction = (data) => ({
  type: "NEW_TEXT",
  payload: data
})
export const newBatchesAction = (data) => ({
  type: "NEW_BATCH",
  payload: data
})


export const reset_password_action = (data) => {
  return {
    type: 'RESET_PASSWORD',
    payload: data
    //This needs a fetch, fetch the backend password reset endpoint
  }
}

export const analyzeBatchAction = (data) => {
  return {
    type: 'ANALYZE_BATCH',
    payload: data
  }
}

export const analyzeTextAction = (data) => {
  return {
    type: 'ANALYZE_TEXT',
    payload: data
  }
}

export const registerValidate = data => dispatch => {
  let myHeaders = new Headers({
    'content-type': 'application/json',
  });
  const config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  }
  return fetch(`${URLBASE}/api/registration/validation/`, config)
    .then(response => {
      if (response.status === 400) {
        throw new Error
      } else {
        return response.json()
      }
    })
    .then(data => {
      dispatch(regististration_validation(data))
      return 1;
    })
    .catch(err => {
      return 2;
    })
}

export const reset_password = data => dispatch => {
  let myHeaders = new Headers({
    'content-type': 'application/json',
  });
  const config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  }
  return fetch(`${URLBASE}/api/registration/validation/`, config)
    .then(response => {
      if (response.status === 400) {
        throw new Error
      } else {
        return response.json()
      }
    })
    .then(data => {
      dispatch(reset_password_action(data))
      return 1;
    })
    .catch(err => {
      return 2;
    })
}

export const registerNewUser = data => dispatch => {
  console.log("dataaaaaaa", data)
  const body = JSON.stringify(data)

  console.log("the body", body)
  let myHeaders = new Headers({
    'content-type': 'application/json',
  });
  const config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  }
  return fetch(`${URLBASE}/api/registration/`, config)
    .then(response => response.json())
    .then(data => {
      dispatch(registerAction(data))
    })
}

export const fetchHistory = () => (dispatch) => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  });

  const config = {
    method: 'GET',
    headers: myHeaders,
  };
  fetch(`${URLBASE}/api/all_analyses`, config)
    .then(response => {
      if (response.status.ok) {
        return response.json()
      }
      // console.log("response", response)
      return response.json();
    })
    .then(data => dispatch(fetchHistoryAction(data)))
}

export const fetchBatches = () => (dispatch) => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  });

  const config = {
    method: 'GET',
    headers: myHeaders,
  };
  fetch(`${URLBASE}/api/all_batches`, config)
    .then(response => {
      if (response.status.ok) {
        return
      }
      return response.json();
    })
    .then(data => dispatch(fetchBatchesAction(data)))
}

// --------------------------------------------------------------------------------IN HERE
export const analyzeBatch = (data) => dispatch => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  });

  const config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
  };
  fetch(`${URLBASE}/api/analysis_batch/${data}/`, config)
    .then(response => {
      if (response.status.ok) {
        return
      }
      return response.json();
    })
  // .then(data => dispatch(analyzeBatchAction(data)))
}

export const deleteBatch = (data) => dispatch => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  });

  const config = {
    mode: "cors",
    method: 'DELETE',
    headers: myHeaders,
  };
  fetch(`${URLBASE}/api/all_batches/${data}/`, config)
    .then(response => {
      return response.json()
    })
  // .then(data => {
  //     dispatch(analyzeTextAction(data))
  // })
}

export const deleteText = data => dispatch => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  });

  const config = {
    mode: "cors",
    method: 'DELETE',
    headers: myHeaders,
  };
  fetch(`${URLBASE}/api/all_texts/${data}/`, config)
    .then(response => {
      return response.json()
    })
}

export const deleteTextAction = (data) => {
  return {
    type: 'DELETE_TEXT',
    payload: data
  }
}

export const analyzeText = (data) => dispatch => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  });

  const config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
  };
  fetch(`${URLBASE}/api/analysis_text/${data}/`, config)
    .then(response => {
      if (response.status.ok) {
        return
      }
      return response.json();
    })
}

export const fetchTexts = () => (dispatch) => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  });

  const config = {
    method: 'GET',
    headers: myHeaders,
  };
  fetch(`${URLBASE}/api/all_texts/`, config)
    .then(response => {
      if (response.status.ok) {
        return response.json()
      }
      return response.json();
    })
    .then(data => dispatch(fetchTextsAction(data)))
}


export const createText = (data) => dispatch => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'content-type': 'application/json',
  });

  const config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  };
  return fetch(`${URLBASE}/api/all_texts/`, config)
    .then(response => {
      if (response.status.ok) {
        return
      }
      return response.json();
    })
    .then(data => dispatch(newTextsAction(data)))
}

export const createBatch = (data) => dispatch => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'content-type': 'application/json',
  });

  const config = {
    mode: "cors",
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  };
  return fetch(`${URLBASE}/api/all_batches/`, config)
    .then(response => {
      if (response.status.ok) {
        return
      }
      return response.json();
    })
    .then(data => dispatch(newBatchesAction(data)))
}

// export const deleteAccount = (data) => {
//     return {
//         type:'REGISTER',
//         payload: data
//     }
// }

export const deleteAccount = (data) => dispatch => {
  const myHeaders = new Headers({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'content-type': 'application/json',
  });

  const config = {
    mode: "cors",
    method: 'DELETE',
    headers: myHeaders,
    body: JSON.stringify(data),
  };
  
  return fetch(`${URLBASE}/api/delete_account/${data}//`, config)
    .then(response => {
      if (response.status.ok) {
        localStorage.clear()
        return
      }
      return response.json();
    })
    .then(data => dispatch(newBatchesAction(data)))
}

export const validateTokens = (state, dispatch) => (getState) => {
  const access = getState()
  const accessBody = {
    token: access,
  };
  const accessHeaders = new Headers({
    'content-type': 'application/json',
  });
  const accessConfig = {
    method: 'POST',
    body: JSON.stringify(accessBody),
    headers: accessHeaders,
  }
  const refreshHeaders = new Headers({
    'content-type': 'application/json',
  });
  return fetch(`${URLBASE}/api/token/verify/`, accessConfig)
    .then(response => {
      if (response.status === 401) {
        // checking refresh token
        const refresh = state.tokens.refresh;
        let refreshBody = {
          token: refresh,
        };
        const refreshConfig = {
          method: 'POST',
          body: JSON.stringify(refreshBody),
          headers: refreshHeaders,
        };
        return fetch(`${URLBASE}/api/token/verify/`, refreshConfig);
      }
      return;
    })
    .then(response => {
      if (response === undefined) {
        return;
      }
      if (response.status === 200) {
        const refreshBody = {
          refresh: state.tokens.refresh,
        }
        const refreshConfig = {
          method: 'POST',
          body: JSON.stringify(refreshBody),
          headers: refreshHeaders,
        };
        return fetch(`${URLBASE}/api/token/verify/`, refreshConfig);
      }
      else {
        localStorage.clear()
        return;
      }
    })
    .then(response => {
      if (response === undefined) {
        return;
      }
      return response.json()
    })
    .then(data => {
      if (data === undefined) {
        return;
      }
      console.log(data);
      const tokens = {
        refresh: state.tokens.refresh,
        access: data.access,
      }
      const action = setToken(tokens);
      dispatch(action);
      localStorage.setItem('tokens', JSON.stringify(tokens));
    })
}

  //------------------------------------------------------------------

