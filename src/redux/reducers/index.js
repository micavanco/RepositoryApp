
import { combineReducers } from 'redux';
import { USERS_REPOSITORIES } from '../actions/usersReposFetched';
import { LOGIN_WINDOW } from "../actions/loginWindowState";


const repositoriesReducer = (repositories = null, action)=>{
    switch(action.type){
        case USERS_REPOSITORIES:
            if(action.payload){
                return action.payload;
            }
            return null;
        default: return repositories;
    }
};

const applicationStateReducer = (applicationState = null, action) => {
    switch(action.type){
        case LOGIN_WINDOW:
            if(action.payload){
                return action.payload;
            }
            return null;
        default: return applicationState;
    }
};

export default combineReducers({
    repositories: repositoriesReducer,
    applicationState: applicationStateReducer
});
