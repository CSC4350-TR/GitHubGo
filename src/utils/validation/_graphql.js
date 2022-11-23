export const ownerNameQuery = (ownername) => `\n\townername: user(login: "${ownername}"){ login }`

export const orgNameQuery = (orgname) => `\n\townername: organization(login: "${orgname}") { login }`

export const repoNameQuery = (reponame, ownername) => `\n\treponame: repository(name: "${reponame}", owner: "${ownername}"){ 
    refs(refPrefix: "refs/heads/", first: 10){
        nodes{
            name
        }
    }
}`

export const userNameQuery = (username) => `\n\tusername: user(login: "${username}"){ id }`
export const filePathQuery = (filepath) => `\n\tquery{}`

