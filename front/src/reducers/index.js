import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import superviseReducer from './superviseReducer';
import defectReducer from './defectReducer';
import userReducer from './userReducer';
import defectAttachmentReducer from './defectAttachmentReducer';


export default combineReducers({
    defects: defectReducer,
    supervises: superviseReducer,
    attachments: defectAttachmentReducer,
    users: userReducer,
    router: routerReducer
})