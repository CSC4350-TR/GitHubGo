export const commitDataQuery = 
(ownername, reponame, userid, branch) => `query { 
    repository(owner: "${ownername}", name: "${reponame}") {
    object(expression: "HEAD") {
      ... on Commit {
        history(author: {id: "${userid}"}) {
          totalCount
          nodes {
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
    q2: repository(owner: "${ownername}", name: "${reponame}") {
        object(expression: "HEAD") {
			... on Commit{
                history{
                    totalCount
                }
            }
        }
    }
}`