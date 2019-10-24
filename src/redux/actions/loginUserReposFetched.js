import axios from 'axios';
export const USER_REPOSITORIES = 'USER_REPOSITORIES';


// Action Creator
export const userRepositories = (username, password) => {

    return async function(dispatch, getState)
    {
        let repositories = [];
        await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            repositories = res;
        }).catch(err => console.log(err));
        // Return an action
        dispatch({
            type: USER_REPOSITORIES,
            payload: repositories
        })
    };
};
