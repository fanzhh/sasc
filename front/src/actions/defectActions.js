import { 
    FETCH_DEFECTS, 
    FETCH_DEFECT ,
    FETCH_DEFECTS_BY_SUPERVISE, 
    NEW_DEFECT, 
    EDIT_DEFECT, 
    DELETE_DEFECT,
    NEW_DEFECT_ATTACHMENT,
    UURL 
} from './types';

export const fetchDefects = () => dispatch => {
    fetch(UURL+'supervise/defectswithsupervise/')
        .then(res=>res.json())
        .then(defects=>
            dispatch({
                type: FETCH_DEFECTS,
                payload: defects
            })
        );
}


export const fetchDefect = (pk) => dispatch => {
    fetch(UURL+'supervise/defect/'+pk+'/')
    .then(res=>res.json())
    .then(defect=>
        dispatch({
            type: FETCH_DEFECT,
            payload: defect
        })
    );
}


/* 上传缺陷描述附件、缺陷整改附件使用一个action，通过operation来区别 */
export const newDefectAttachment = (pk, operation, attachData, token) => dispatch => {
    console.log('pk:'+pk+',operation:'+operation)
    var formData = new FormData();
    for (var name in attachData) {
        if (name === 'img') {
            if (attachData['img'] !== null) {
                formData.append(name, attachData[name])
            }
        } else {
            formData.append(name, attachData[name])
        }
    }
    let URL = '';
    if (operation === 'defect_description') {
        URL = UURL + 'supervise/defectattachments/' + pk + '/'
    } else {
        URL = UURL + 'supervise/defectcorrectattachments/' + pk + '/'
    }
    fetch(URL,{
            method: 'POST',
            headers: {
                'Authorization': 'JWT ' + token,
            },
            body: formData
        })
        .then(res=>res.json())
        .then(attachment=>
            dispatch({
                type: NEW_DEFECT_ATTACHMENT,
                payload: attachment
            })
        );
}


export const fetchDefectsBySupervise = (pk) => dispatch => {
    fetch(UURL+'supervise/defects/'+pk+'/')
        .then(res=>res.json())
        .then(defects =>
            dispatch({
                type: FETCH_DEFECTS_BY_SUPERVISE,
                payload: defects
            })
        );
}


export const createDefect = (pk, defectData, token) => dispatch => {
    fetch(UURL+'supervise/defects2/'+pk+'/',{
            method: 'POST',
            headers: new Headers({
                'Authorization': 'JWT ' + token,
                'content-type': 'application/json'
            }),
            body: JSON.stringify(defectData)
        })
        .then(res=>res.json())
        .then(defect=>
            dispatch({
                type: NEW_DEFECT,
                payload: defect
            })
        );
}


export const editDefect = (pk, defectData, token) => dispatch => {
    fetch(UURL+'supervise/defect/'+pk+'/',{
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'JWT ' + token,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(defectData)
    })
    .then(res=>res.json())
    .then(defect=>
        dispatch({
            type: EDIT_DEFECT,
            payload: defect
        })
    ); 
}


export const deleteDefect = (pk, token) => dispatch => {
    fetch(UURL+'supervise/defect/'+pk+'/',{
        method: 'DELETE',
        headers: {
            'Authorization': 'JWT ' + token,
            'content-type': 'application/json'
        }
    }).then(
        dispatch({
            type: DELETE_DEFECT,
            payload: {}
        })
    );
}