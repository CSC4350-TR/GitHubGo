import axios from "axios"
import { commitDataQuery } from "./_graphql"

export const fetchRepostatsData = async (ownername, reponame, userid, branch) => {
    const res = await axios.post("https://api.github.com/graphql", {
        query: commitDataQuery(ownername, reponame, userid, branch)
    }, {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
    }).catch(err => console.error(err))
    if (!res || !res.data.data.repository.object) return { totalRepoCommit: 0, totalUserCommit: 0, totalAddition: 0, totalDeletion: 0, datalist: [] }
    let additions = 0
    let deletions = 0
    const commitData = res.data.data.repository.object.history.nodes;
    const totalUserCommit = res.data.data.repository.object.history.totalCount;
    const totalRepoCommit = res.data.data.q2.object.history.totalCount;
    for (let i = 0; i < commitData.length; i++) {
        additions += commitData[i].additions
        deletions += commitData[i].deletions
    }
    return { totalRepoCommit: totalRepoCommit, totalUserCommit: totalUserCommit, totalAddition: additions, totalDeletion: deletions, datalist: res.data.data.repository.object.history.nodes.map(i => ({ ...i, committedDate: new Date(i.committedDate) })) }
}