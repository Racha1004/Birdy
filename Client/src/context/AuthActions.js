export const LoginStart =(userCredentials) => ({
    type : "LOGIN_START"
});

export const LoginSucces = (user) => ({
    type : "LOGIN_SUCCES",
    payload : user,
});

export const LoginFailure = (error) => ({
    type : "LOGIN_FAILURE",
    payload : error,
});

export const Logout = () => ({
    type : "LOGOUT"
});

export const RegisterStart = (userCredentials) => ({
    type: "REGISTER_START",
});
    
export const RegisterSuccess = (user) => ({
    type: "REGISTER_SUCCESS",
    payload: user,
});
    
export const RegisterFailure = (error) => ({
    type: "REGISTER_FAILURE",
    payload: error,
});