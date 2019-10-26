import axios from 'axios';
import _ from "lodash";

export const USERS_REPOSITORIES = 'USERS_REPOSITORIES';


// Action Creator
export const usersRepositories = (name, page = 1) => {

    return async function(dispatch, getState)
    {
        let repositories = localStorage.getItem(`${name},${page}`);
        localStorage.setItem('last-search', `{"name":"${name}","page":${page}}`);
        if(!repositories) {
            await axios.get(`https://api.github.com/search/repositories?q=${name}+in:name&page=${page}&per_page=60`).then(res => {
                repositories = res;
                repositories.data.items = repositories.data.items.map(e => e = _.pick(e, ['id', 'name', 'owner', 'stargazers_count', 'created_at']));
                localStorage.setItem(`${name},${page}`, JSON.stringify(repositories));
            }).catch(err => console.log(err));
        } else {
            repositories = JSON.parse(repositories);
        }

        // Return an action
        dispatch({
            type: USERS_REPOSITORIES,
            payload: repositories
        })
    };
};
