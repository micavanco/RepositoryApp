import axios from 'axios';
export const USERS_REPOSITORIES = 'USERS_REPOSITORIES';


// Action Creator
export const usersRepositories = (name, page) => {

    return async function(dispatch, getState)
    {
        let repositories = [];
        await axios.get(`https://api.github.com/search/repositories?q=${name}+in:name&page=${page}`).then(res => {
            repositories = res;
        }).catch(err => console.log(err));
        // Return an action
        dispatch({
            type: USERS_REPOSITORIES,
            payload: repositories
        })
    };
};
