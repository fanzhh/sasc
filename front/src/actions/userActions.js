import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UURL } from './types';


export const registerUser = (userData) => dispatch => {
    fetch(UURL+'users/register/',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res=>res.json())
        .then(userData=>
            dispatch({
                type: REGISTER_USER,
                payload: userData
            })
        ).catch(function(error){
            alert('注册出现错误：'+error);
            console.log(error)
        });
}

export const loginUser = (userData) => dispatch => {
    fetch(UURL+'users/api-token-auth/',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    }) 
    .then(res=>res.json())
    .then(userinfo=> {
        userinfo.username = userData.username;    
        dispatch({
            type: LOGIN_USER,
            payload: userinfo
        })}
    ).catch(function(error){
        alert('登录出现错误：'+error);
        console.log(error)
    });
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    })
}