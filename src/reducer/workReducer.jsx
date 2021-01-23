import { STEPONE_WORK,
        STEPTWO_WORK,
        STEPTHREE_WORK } from "../types/workTypes";

const  workReducer  = (state = {}, action) => {

    switch (action?.type) {

        case STEPONE_WORK:
            return{
                ...state,
                namework: action.payload.namework,
                day_init: action.payload.day_init,
                day_final: action.payload.day_final,
                time_init: action.payload.time_init,
                time_final: action.payload.time_final,   
            }
        case STEPTWO_WORK:
            return{
                 ...state,
                 workers: action.payload.workers,
                 workersname: action.payload.workersname,
                 totalworkers: action.payload.totalworkers,
                    
            }
        case STEPTHREE_WORK:
            return{
                ...state,
                workris: action.payload.workris,
                emailreport: action.payload.emailreport,
            }
        
        default :
            break;
    }

}


export default workReducer