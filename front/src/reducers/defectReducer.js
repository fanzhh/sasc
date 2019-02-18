import { 
    FETCH_DEFECTS, 
    FETCH_DEFECTS_BY_SUPERVISE, 
    NEW_DEFECT, 
    EDIT_DEFECT, 
    DELETE_DEFECT, 
    FETCH_DEFECT ,
    NEW_DEFECT_ATTACHMENT
} from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state=initialState, action) {
    switch(action.type) {
        case FETCH_DEFECTS:
            return {
                ...state, 
                items: action.payload
            };
        case FETCH_DEFECTS_BY_SUPERVISE:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_DEFECT:
            return {
                ...state,
                item: action.payload
            }
        case NEW_DEFECT:
            return {
                ...state,
                item: action.payload
            }
        case EDIT_DEFECT:
            return {
                ...state,
                item: action.payload
            }
        case DELETE_DEFECT:
            return {
                ...state,
                item: action.payload
            }
        case NEW_DEFECT_ATTACHMENT:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;         
    }
}