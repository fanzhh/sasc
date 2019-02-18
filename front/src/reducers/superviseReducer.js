import { 
    FETCH_SUPERVISES, 
    FETCH_SUPERVISE, 
    NEW_SUPERVISE, 
    EDIT_SUPERVISE, 
    DELETE_SUPERVISE,
 } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state=initialState, action) {
    switch(action.type) {
        case FETCH_SUPERVISES:
            return {
                ...state, 
                items: action.payload
            };
        case NEW_SUPERVISE:
            return {
                ...state,
                item: action.payload
            };
        case EDIT_SUPERVISE:
            return {
                ...state,
                item: action.payload
            }
        case FETCH_SUPERVISE:
            return {
                ...state,
                item: action.payload
            };
        case DELETE_SUPERVISE:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;         
    }
}