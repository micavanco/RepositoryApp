
import { combineReducers } from 'redux';
import { USER_REPOSITORIES } from '../actions/loginUserReposFetched';
import { USERS_REPOSITORIES } from '../actions/usersReposFetched';


const repositoriesReducer = (repositories = null, action)=>{
    switch(action.type){
        case USER_REPOSITORIES:
            if(action.payload){
                return action.payload;
            }
            return null;
        case USERS_REPOSITORIES:
            if(action.payload){
                return action.payload;
            }
            return null;
        default: return repositories;
    }
};

export default combineReducers({
    repositories: repositoriesReducer
});
