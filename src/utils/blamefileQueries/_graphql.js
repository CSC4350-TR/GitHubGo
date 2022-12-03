export const lastChangeQuery = (ownername, reponame, branch, filepath) => `query {
  repositoryOwner(login: "${ownername}") {
    repository(name: "${reponame}") {
      object(expression: "${branch}") {
        ... on Commit {
          blame(path: "${filepath}") {
            ranges {
              startingLine
              endingLine
              commit {
                oid
                author {
                  user{
                    login
                    avatarUrl
                    url
                  }
                }
                committedDate
                url
                message 
              }
            }
          }
        }
      }
    }
  }
  file: repository(owner: "${ownername}", name: "${reponame}") {
      object(expression: "${branch}:${filepath}") {
      ... on Blob {
        isBinary
        text
      }
    }
  }
}`
