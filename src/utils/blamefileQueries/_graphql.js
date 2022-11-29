export const lastChangeQuery = (ownername, reponame, branch, filepath) => `query {
  repositoryOwner(login: "${ownername}") {
    repository(name: "${reponame}") {
      object(expression: "${branch}") {
        ... on Commit {
          blame(path: "${filepath}") {
            ranges {
              startingLine
              endingLine
              age
              commit {
                oid
                author {
                  name
                }
                committedDate
                history {
                  totalCount
                }
                url
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
