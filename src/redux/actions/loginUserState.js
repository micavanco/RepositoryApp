export const LOGIN_USER = 'LOGIN_USER';


// Action Creator
export const loginUserState = (isLogged) => {

    return async function(dispatch, getState)
    {

        // Return an action
        dispatch({
            type: LOGIN_USER,
            payload: isLogged
        })
    };
};
