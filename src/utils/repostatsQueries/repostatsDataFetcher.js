import { axiosGitHubGraphQL } from "../.."
import { commitDataQuery } from "./_graphql"

export const fetchRepostatsData = async(ownername, reponame, branch, userid) => {
        const res = await axiosGitHubGraphQL.post("", {
            query: commitDataQuery(ownername, reponame, branch, userid)
        })
        if(res.data.data.repository){
            let additions = 0
            let deletions = 0
            const commitData = res.data.data.repository.ref.target.history.nodes;
            const totalUserCommit = res.data.data.repository.ref.target.history.totalCount; 
            const totalRepoCommit = res.data.data.q2.ref.target.history.totalCount;
            for(let i = 0; i < commitData.length; i++){
                additions += commitData[i].additions
                deletions += commitData[i].deletions
            }
            return {totalRepoCommit: totalRepoCommit, totalUserCommit: totalUserCommit, totalAddition: additions, totalDeletion: deletions, datalist: res.data.data.repository.ref.target.history.nodes.map(i => ({...i, committedDate: new Date(i.committedDate)}))} 
        }
        return {totalRepoCommit: 0, totalUserCommit: 0, totalAddition: 0, totalDeletion: 0, datalist: []} 
}