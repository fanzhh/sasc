import { FETCH_SUPERVISES, NEW_SUPERVISE, FETCH_SUPERVISE, DELETE_SUPERVISE, EDIT_SUPERVISE, UURL } from './types';

export const fetchSupervises = () => dispatch => {
    fetch(UURL+'supervise/supervises/')
        .then(res=>res.json())
        .then(supervises=>
            dispatch({
                type: FETCH_SUPERVISES,
                payload: supervises
            })
        );
}


export const fetchSupervise = (pk) => dispatch => {
    fetch(UURL+'supervise/supervises/'+pk+'/')
        .then(res=>res.json())
        .then(supervise=>
            dispatch({
                type: FETCH_SUPERVISE,
                payload: supervise
            })
        );
} 

export const deleteSupervise = (pk, token) => dispatch => {
    fetch(UURL+'supervise/supervise/'+pk+'/',{
        method: 'DELETE',
        headers: {
            'Authorization': 'JWT ' + token,
            'content-type': 'application/json'
        }
    }).then(
        dispatch({
            type: DELETE_SUPERVISE,
            payload: {}
        })
    );
}

export const createSupervise = (superviseData, token) => dispatch => {
    var formData = new FormData();
    for (var name in superviseData) {
        console.log(superviseData[name]);
        if (name === 'photo') {
            if (superviseData['photo'] !== null) {
                formData.append(name, superviseData[name]);
            }
        } else {
            formData.append(name, superviseData[name]);
        }        
    }
    fetch(UURL+'supervise/supervises/',{
            method: 'POST',
            headers: {
                'Authorization': 'JWT ' + token,
                /*'content-type': 'application/json'*/
            },
            /*body: JSON.stringify(superviseData)*/
            body: formData
        })
        .then(res=>res.json())
        .then(supervise=>
            dispatch({
                type: NEW_SUPERVISE,
                payload: supervise
            })
        );
}

export const editSupervise = (pk, superviseData, token) => dispatch => {
    var formData = new FormData();
    for (var name in superviseData) {
        if (name === 'photo') {
            if ((typeof(superviseData['photo']) !== 'string') && (superviseData['photo'] !== null)) {
                formData.append(name, superviseData[name]);
            }
        } else {
            formData.append(name, superviseData[name]);
        }        
    }
    fetch(UURL+'supervise/supervise/'+pk+'/',{
        method: 'PATCH',
        headers: {
            'Authorization': 'JWT ' + token,
            /*'content-type': 'application/json'*/
        },
        /*body: JSON.stringify(superviseData)*/
        body: formData
    }) 
    .then(res=>res.json())
    .then(supervise=>
        dispatch({
            type: EDIT_SUPERVISE,
            payload: supervise
        })
    );
}