import { axiosGitHubGraphQL } from "../.."
import { userNameQuery } from "./_graphql"

export const validateRepoStats = (ownername, reponame, username) => {
    const result = {
        result : true,
        errors : { ownername : false, reponame  : false, username  : false }
    }
    if(!ownername.state && !validateOwnerName(ownername.data)){
        result.result = false
        result.errors = {
            ...result.errors,
            ownername : true 
        }
    }
    if(!reponame.state && !validateRepoName(reponame.data)){
        result.result = false;
        result.errors = {
            ...result.errors,
            reponame : true 
        }
    }
    if(!username.state && !validateUserName(username.data)){
        result.result = false;
        result.errors = {
            ...result.errors,
            username : true 
        }
    }

    return result
}

export const validateBlameFile = (ownername, reponame, username, filepath) => {
    const result = {
        result : true,
        errors : { ownername : false, reponame : false, username : false, filepath : false }
    }
    if(!ownername.state && !validateOwnerName(ownername.data)){
        result.result = false
        result.errors = {
            ...result.errors,
            ownername : true 
        }
    }
    if(!reponame.state && !validateRepoName(reponame.data)){
        result.result = false;
        result.errors = {
            ...result.errors,
            reponame : true 
        }
    }
    if(!username.state && !validateUserName(username.data)){
        result.result = false;
        result.errors = {
            ...result.errors,
            username : true 
        }
    }
    if(!filepath.state && !validateFilePath(filepath.data)){
        result.result = false;
        result.errors = {
            ...result.errors,
            filepath : true 
        }
    }
    return result
}


export const validateOwnerName = async(ownername) => {
    const res = await axiosGitHubGraphQL.post('', {
        query: userNameQuery
    })
    console.log(res.data.data)
}

const validateRepoName = async(reponame) => {

}

const validateUserName = async(username) => {
    
} 

const validateFilePath = (filepath) => {

}


