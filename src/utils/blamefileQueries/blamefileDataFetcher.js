import { axiosGitHubGraphQL } from "../.."
import { lastChangeQuery } from "./_graphql"

export const fetchBlameFileData = async(ownername, reponame, branch, filepath) => {
        const res = await axiosGitHubGraphQL.post("", {
            query: lastChangeQuery(ownername, reponame, branch, filepath)
        })
        if(!res.data.data.file.object){
            return {fileContent: [], invalidLink: true}
        }
        if(res.data.data.repositoryOwner.repository.object.blame.ranges.length === 0){
            // file is empty
            return {fileContent: [], isempty: true} 
        }
        if(res.data.data.file.object.isBinary){
            // Cannot read binary files
            return {fileContent: [], isbinary: true} 
        }
        
        console.log(res)
        // if(res.data.data.)
        return {fileContent: res.data.data.file.object?.text ? res.data.data.file.object.text.split("\n") : []} 
}