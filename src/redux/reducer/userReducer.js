
import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_REFRESH_TOKEN } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',

    },
    isAuthenticated: false,
    name: '',
    email: '',
    image: '',
    _id: '',
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:

            return {
                ...state, account: {
                    access_token: action?.payload?.token[0],
                    refresh_token: action?.payload?.token[1],
                },
                isAuthenticated: true,
                name: action?.payload?.name,
                email: action?.payload?.email,
                image: action?.payload?.image,
                _id: action?.payload?._id,
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',

                },
                isAuthenticated: false,
                name: '',
                email: '',
                image: '',
                _id: ''

            };
        case USER_REFRESH_TOKEN:
            console.log(`check data: `, action?.payload)
            console.log(`check accessToken: `, action?.payload.accessToken)
            console.log(`check refreshTo: `, action?.payload.accessToken)
            return {
                ...state, account: {
                    access_token: action?.payload?.accessToken,
                    refresh_token: action?.payload?.refreshToken,
                },
                isAuthenticated: true,
                name: action?.payload?.name,
                email: action?.payload?.email,
                image: action?.payload?.image,
            };
        default: return state;
    }
};

export default userReducer;