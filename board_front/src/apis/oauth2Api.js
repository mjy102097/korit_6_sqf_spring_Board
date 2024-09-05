import { instance } from "./util/instance";

export const oauth2MergeApi = async (user) => {
    let mergeData = {
        isSuccess: false,
        fieldErrors: [
            {   
                field: "",
                defaultMessage: ""
            }
        ]
    }

    try {
        const response = await instance.post("/auth/oauth2/merge", user); 
        mergeData = {
            isSuccess: true
        }
    } catch(e) {
        const response = e.response;
        mergeData = {
            isSuccess: false,
        }
        if(typeof(response.data) === 'string') {
            mergeData['errorStatus'] = "loginError";
            mergeData['error'] = response.data;
        } else {
            mergeData['errorStatus'] = "fieldError";
            mergeData['error'] = response.data.map(fieldError => ({field: fieldError.field, defaultMessage: fieldError.defaultMessage}))
        }
    }
    
    return mergeData;
}

export const oauth2JoinApi = async (user) => {
    let JoinData = {
        isSuccess: false,
        fieldErrors: [
            {   
                field: "",
                defaultMessage: ""
            }
        ] 
    }

    try {
        const response = await instance.post("/auth/oauth2/signup", user);
        JoinData = {
            isSuccess: true
        }
    } catch(e) {
        const response = e.response;
        JoinData = {
            isSuccess: false,
            fieldErrors: response.data.map(fieldError => ({field: fieldError.field, defaultMessage: fieldError.defaultMessage}))
        }
    }
    
    return JoinData;

}