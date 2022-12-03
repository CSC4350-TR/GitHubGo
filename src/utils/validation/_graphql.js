export const ownerNameQuery = (ownername) => `ownername: user(login: "${ownername}"){ login }`

export const orgNameQuery = (orgname) => `ownername: organization(login: "${orgname}") { login }`

export const repoNameQuery = (reponame, ownername) => `reponame: repository(name: "${reponame}", owner: "${ownername}"){ 
    refs(refPrefix: "refs/heads/", first: 10){
        nodes{
            name
        }
    }
}`

export const userNameQuery = (username) => `username: user(login: "${username}"){ id }`
