
import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',

    },
    isAuthenticated: false,
    name: '',
    email: '',
    image: '',
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

            };
        default: return state;
    }
};

export default userReducer;