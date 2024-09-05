import { instance } from "./util/instance"

export const signinApi = async (data) => {
    let signinData = {
        isSuccess: false,
        token: null,
        fieldErrors: [
            {   
                field: "",
                defaultMessage: ""
            }
        ]
    }

    try {
        const response = await instance.post("/auth/signin" ,data);
        signinData = {
            isSuccess: true,
            token: response.data
        }
    } catch(e) {
        const response = e.response;
        signinData = {
            isSuccess: false,
        }
        if(typeof(response.data) === 'string') {
            signinData['errorStatus'] = "loginError";
            signinData['error'] = response.data;
        } else {
            signinData['errorStatus'] = "fieldError";
            signinData['error'] = response.data.map(fieldError => ({field: fieldError.field, defaultMessage: fieldError.defaultMessage}))
        }
    }
    
    return signinData;
}