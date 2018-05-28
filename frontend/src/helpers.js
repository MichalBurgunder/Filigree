import { URLBASE } from "./store/actions/constants";

export const verifyAccessToken = verifyAccessToken => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
        throw new Error('NoAccessToken')
    }

    const headers = new Headers({
        "Content-Type": "application/json"
    });
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({token: accessToken})
    };

    return fetch(`${URLBASE}/api/token/verify/`, config)
        .then(response => {
            if (response.status === 400) {
                localStorage.removeItem("access_token");
                throw new Error('BadRequest')
            } else if (response.status === 401) {
                localStorage.removeItem("access_token");
                throw new Error('VerificationFailed')
            }
            return response.json()
        }).catch((e) => console.log(e)) 
}

export const refreshToken = refreshToken => {
    const refTorken = localStorage.getItem("refresh_token");
    if (!refTorken) {
        throw new Error('NoRefreshToken')
    }

    const headers = new Headers({
        "Content-Type": "application/json"
    });
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({refresh: refTorken})
    };

    return fetch(`${URLBASE}/api/token/refresh/`, config)
        .then(response => {
            if (response.status === 400) {
                localStorage.removeItem("refresh_token");
                throw new Error('BadRequest')
            } else if (response.status === 401) {
                localStorage.removeItem("refresh_token");
                throw new Error('TokenRefreshFailed')
            }
            return response.json()
        })
        .then(data => {
            localStorage.setItem('access_token', data.access)
        })
}


//-------------------------------------UNAUTHORIZEDPAGE----------

