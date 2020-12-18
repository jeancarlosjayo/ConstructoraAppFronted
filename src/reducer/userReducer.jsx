import { ADD_OTHERDATOS_USER, ADD_UID_USER, LOGIN_USER,LOGOUT_USER } from "../types/userTypes";

const  userReducer  = (state = {}, action) => {

    switch (action?.type) {

        case LOGIN_USER:
            return{
                ...state,
                isLogged: action.payload   
            }
        case LOGOUT_USER:
            return{
                 ...state,
                isLogged: action.payload,
                type: null,
                email: null,
                name: null,
                lastname:null,
                uid:null
                    
            }
        case ADD_UID_USER:
            return{
                ...state,
                uid: action.payload
            }
        
        case ADD_OTHERDATOS_USER :
            return{
                ...state,
                type: action.payload.type,
                name: action.payload.name,
                email: action.payload.email
            }
        
        default :
            break;
    }

}


export default userReducer