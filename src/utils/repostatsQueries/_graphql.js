export const commitDataQuery = (ownername, reponame, branch, userid) => `query { 
                repository(owner: "${ownername}", name:"${reponame}"){
                    ref(qualifiedName:"${branch}"){
                        target{
                            ... on Commit{
                                history(author: {id: "${userid}"}){
                                    totalCount
                                    nodes{
                                        additions
                                        deletions
                                        committedDate
                                        changedFilesIfAvailable
                                        message
                                        commitResourcePath
                                    }
                                }
                            } 
                        }
                    }
                }
                q2: repository(owner: "${ownername}", name: "${reponame}") {
                    ref(qualifiedName: "${branch}") {
                        target {
                            ... on Commit {
                                history {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }`