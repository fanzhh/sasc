import { 
    GET_DEFECT_ATTACHMENTS_BY_SUPERVISE
} from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_DEFECT_ATTACHMENTS_BY_SUPERVISE:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;         
    }
}