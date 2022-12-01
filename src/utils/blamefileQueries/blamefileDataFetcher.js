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
        const arrRange = res.data.data.repositoryOwner.repository.object.blame.ranges
        const codeLines = res.data.data.file.object.text.split("\n")
        
        let store = []
        for(let i = 0; i < arrRange.length; i++){
            const temp = codeLines.slice(arrRange[i].startingLine, arrRange[i].endingLine+1)
            store.push([arrRange[i].commit, temp, arrRange[i].startingLine])
        }
        console.log(store)
        return {fileContent: store} 
}