export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN'

export const doLogin = (data) => {
    return (
        {
            type: FETCH_USER_LOGIN_SUCCESS,
            payload: data,
        }
    )
}

export const dologout = () => {
    return (
        {
            type: USER_LOGOUT_SUCCESS,

        }
    )
}

export const doRefreshToken = (data) => {
    return (
        {
            type: USER_REFRESH_TOKEN,
            payload: data,

        }
    )
}