import { checkToken } from "../services/apiAuthService";


const checkRole = async (access_token) => {

    let role = await checkToken(access_token);
    return role
}

export {
    checkRole
}