import axios from "axios"
import { orgNameQuery, ownerNameQuery, repoNameQuery, userNameQuery } from "./_graphql"

const errorMapper = {
    ownername: "owner name not found",
    username: "username not found",
    reponame: "repository not found"
}

const defaultErrors = { username: { status: false, message: "" }, reponame: { status: false, message: "" }, ownername: { status: false, message: "" }, filepath: { status: false, messasge: "" } }

export const validateRepoStats = async (ownername, reponame, username, ignore, isOrg, defaultData) => {
    let query = `query{`
    let count = 3;
    if (isOrg === "org" && !ignore.ownername) {
        query += orgNameQuery(ownername)
        count--;
    }
    if (isOrg === "user" && !ignore.ownername) {
        query += ownerNameQuery(ownername)
        count--;
    }
    if (!ignore.reponame) {
        query += repoNameQuery(reponame, ownername)
        count--;
    }
    if (!ignore.username) {
        query += userNameQuery(username)
        count--;
    }
    query += `\n}`

    if (count !== 3) {
        const res = await axios.post('https://api.github.com/graphql', { query: query }, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        }).catch(err => console.error(err))
        if ("errors" in res.data) {
            const errors = { ...defaultErrors, ...Object.fromEntries(res.data.errors.map(i => [i.path[0], { status: true, message: errorMapper[i.path[0]] }])) }
            return {
                result: false, errors: errors, data: {
                    userid: (defaultData.userid === "") ? res.data.data?.username?.id ?? "" : defaultData.userid,
                    branches: (defaultData.branches.size === 0) ? new Set(res.data.data?.reponame?.refs?.nodes.map(i => i.name)) ?? new Set([]) : defaultData.branches
                }
            }
        }
        return {
            result: true, errors: defaultErrors, data: {
                userid: (defaultData.userid === "") ? res.data.data?.username?.id ?? "" : res.data.data?.username?.id ?? defaultData.userid,
                branches: (defaultData.branches.size === 0) ? new Set(res.data.data?.reponame?.refs?.nodes.map(i => i.name)) ?? new Set([]) : defaultData.branches
            }
        }
    }
    return { result: true, errors: defaultErrors, data: defaultData }
}

export const validateBlameFile = async (ownername, reponame, ignore, isOrg) => {
    let query = `query{`
    let count = 2;
    if (isOrg === "org" && !ignore.ownername) {
        query += orgNameQuery(ownername)
        count--;
    }
    if (isOrg === "user" && !ignore.ownername) {
        query += ownerNameQuery(ownername)
        count--;
    }
    if (!ignore.reponame) {
        query += repoNameQuery(reponame, ownername)
        count--;
    }
    query += `\n}`

    if (count !== 2) {
        const res = await axios.post('https://api.github.com/graphql', { query: query }, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        }).catch(err => console.error(err))
        if ("errors" in res.data) {
            const errors = { ...defaultErrors, ...Object.fromEntries(res.data.errors.map(i => [i.path[0], { status: true, message: errorMapper[i.path[0]] }])) }
            return { result: false, errors: errors }
        }
    }
    return { result: true, errors: defaultErrors }
}
