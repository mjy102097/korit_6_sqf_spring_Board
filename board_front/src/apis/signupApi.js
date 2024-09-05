import { instance } from "./util/instance"

export const signupApi = async (user) => {
    console.log(user);
    let signupData = {
        isSuccess: false,
        ok: {
            message: "",
            user: null
        },
        error: [
            {   
                field: "",
                defaultMessage: ""
            }
        ] 
    }

    try {
        const response = await instance.post("/auth/signup" ,user);
        signupData = {
            isSuccess: true,
            ok: response.data
        }
    } catch(e) {
        const response = e.response;
        signupData = {
            isSuccess: false,
            fieldErrors: response.data.map(fieldError => ({field: fieldError.field, defaultMessage: fieldError.defaultMessage}))
        }
    }
    
    return signupData;
}