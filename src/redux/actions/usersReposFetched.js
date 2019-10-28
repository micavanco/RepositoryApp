import axios from 'axios';
import _ from "lodash";

export const USERS_REPOSITORIES = 'USERS_REPOSITORIES';


// Action Creator
export const usersRepositories = (name, page = 1, searchPage = 1) => {

    return async function(dispatch, getState)
    {
        let repositories = localStorage.getItem(`${name},${page}`);
        const lastSearch = JSON.parse(localStorage.getItem('last-search'));

        if(lastSearch)
            localStorage.setItem('last-search',
                `{"name":"${name}"
                ,"page":${page}
                ,"searchPage":${searchPage}
                ,"pageFrom":${lastSearch.pageFrom}
                ,"pageTo":${lastSearch.pageTo}
                ,"pagination":${lastSearch.pagination}
                }`);
        else
            localStorage.setItem('last-search',
                `{"name":"${name}"
                ,"page":${page}
                ,"searchPage":1
                ,"pageFrom":0
                ,"pageTo":5
                ,"pagination":5
                }`);
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        let username = '';
        let password = '';
        if(credentials) {
            username = credentials.username;
            password = credentials.password;
        }

        if(!repositories) {
            await axios.get(`https://api.github.com/search/repositories?q=${name}+in:name&page=${page}&per_page=60`, {
                headers: {
                    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                    'Content-Type': 'application/json'
                }}).then(res => {
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
