import { 
    GET_DEFECT_ATTACHMENTS_BY_SUPERVISE,
    UURL 
} from './types';



export const getDefectAttachmentsBySupervise = (pk) => dispatch => {
    fetch(UURL + 'supervise/getattachmentsbysupervise/' + pk + '/')
        .then(res=>res.json())
        .then(attachments =>
            dispatch({
                type: GET_DEFECT_ATTACHMENTS_BY_SUPERVISE,
                payload: attachments
            })
        );
}