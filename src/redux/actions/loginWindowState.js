export const LOGIN_WINDOW = 'LOGIN_WINDOW';


// Action Creator
export const loginWindowState = (isOpened) => {

    return async function(dispatch, getState)
    {

        // Return an action
        dispatch({
            type: LOGIN_WINDOW,
            payload: isOpened
        })
    };
};
