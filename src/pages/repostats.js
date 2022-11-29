import React, { useState } from 'react';
import DataPlots from '../components/DataPlots';
import Loading from '../components/Loading';
import SummaryData from '../components/SummaryData';
import Tables from '../components/Tables';
import { fetchRepostatsData } from '../utils/repostatsQueries/repostatsDataFetcher';
import { validateRepoStats } from '../utils/validation/validate';

function RepoStats() {
    const [error, setErrors] = useState({ username: { status: false, message: "" }, reponame: { status: false, message: "" }, ownername: { status: false, message: "" }, filepath: { status: false, messasge: "" } })
    const [form, setForm] = useState({ ownername: "CSC4350-TR", reponame: "GitHubGo", username: "Meet-forever" });
    const [validate, setValidate] = useState({ ownername: false, reponame: false, username: false, filename: true })
    const [isUser, setUser] = useState("org")
    const [fetchData, setFetchData] = useState({ userid: "", branches: new Set([]) })
    const [repostatsData, setRepostatsData] = useState({ totalRepoCommit: 0, totalUserCommit: 0, totalAddition: 0, totalDeletion: 0, datalist: [] })
    const [show, setShow] = useState(false);
    const isSelected = (val) => isUser === val;
    const handleSelectChange = (e) => setUser(e.target.value);

    const handleInput = (e) => {
        setForm(i => ({ ...i, [e.target.name]: e.target.value }))
        setValidate(i => ({ ...i, [e.target.name]: false }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await validateRepoStats(form.ownername, form.reponame, form.username, validate, isUser, fetchData);
        setErrors(i => ({ ...i, ...data.errors }))
        setValidate(Object.fromEntries(Object.entries(data.errors).map(i => [i[0], !i[1].status])))
        setFetchData(data.data)
        if (!data.result) return
        setRepostatsData(await fetchRepostatsData(form.ownername, form.reponame, data.data.userid, "main"))
        setShow(true);
        // console.log(repostatsData.datalist.map(i => i.additions))
    }

    return (
        <div className="flex items-center justify-start max-w-7xl flex-col min-h-screen p-6 overflow-hidden">
            <form className='flex flex-col items-center md:items-start gap-3 md:flex-row p-1' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <input spellCheck={false} value={form.ownername} title="Owner Name" onInput={e => handleInput(e)} className={`bg-gray-50 p-3 rounded-md border-2 ${error.ownername.status ? "border-red-500 focus:outline-red-500" : "focus:outline-gray-200"}`} type={'text'} name='ownername' placeholder="Owner Name" required />
                    {error.ownername.status ? <div className='break-words text-xs text-red-600'>*{error.ownername.message}</div> : null}
                    <div className=''> Organization?
                        <span className='mx-1'>No <input type={'radio'} name="isorg" value={"user"} checked={isSelected('user')} onChange={handleSelectChange} /></span>
                        <span className="mx-1">Yes <input type={'radio'} name="isorg" value={"org"} checked={isSelected('org')} onChange={handleSelectChange} /></span>
                    </div>
                </div>
                <div>
                    <input spellCheck={false} value={form.reponame} title="Repository Name" onInput={e => handleInput(e)} className={`bg-gray-50 p-3 rounded-md border-2 ${error.reponame.status ? "border-red-500 focus:outline-red-500" : "focus:outline-gray-200"}`} type={'text'} name='reponame' placeholder="Repository Name" required />
                    {error.reponame.status ? <div className='break-words text-xs text-red-600'>*{error.reponame.message}</div> : null}
                </div>
                <div>
                    <input spellCheck={false} value={form.username} title="Username" onInput={e => handleInput(e)} className={`bg-gray-50 p-3 rounded-md focus:outline-gray-200 border-2 ${error.username.status ? "border-red-500 focus:outline-red-500" : "focus:outline-gray-200"}`} type={'text'} name='username' placeholder="Username" required />
                    {error.username.status ? <div className='break-words text-xs text-red-600'>*{error.username.message}</div> : null}
                </div>
                <div>
                    <button type={"submit"} className="p-3 text-white bg-blue-500 rounded-md focus:outline-blue-700">Submit</button>
                </div>
            </form>
            <br />
            <br />
            <br />
            {show?
            repostatsData?
            <div className='overflow-hidden w-full h-full'>
                <h2 className='text-center text-4xl font-semibold'>Visualization</h2>
                    <DataPlots repostatsData={repostatsData} />
                    <SummaryData totalAddition={repostatsData.totalAddition}
                        totalDeletion={repostatsData.totalDeletion}
                        totalUserCommit={repostatsData.totalUserCommit}
                        totalRepoCommit={repostatsData.totalRepoCommit} />
                    <Tables headings={["Additions", "Deletions", "Commit Date", "File Change", "Commit Message", "Path"]} rows={repostatsData.datalist} />
            </div>:<Loading />
            :null}
        </div>
    )
}

export default RepoStats