import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../actions/types';
/*import { logoutUser } from '../actions/userActions';*/

const initialState = {
    items: [],
    item: {}
}

export default function(state=initialState, action) {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state, 
                item: action.payload
            };
        case LOGIN_USER:
            return {
                ...state,
                item: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                item: {}
            }
        default:
            return state;         
    }
}