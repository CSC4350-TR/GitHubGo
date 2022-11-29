import React, { useState } from 'react';
import Loading from '../components/Loading';
import { fetchBlameFileData } from '../utils/blamefileQueries/blamefileDataFetcher';
import { validateRepoStats } from '../utils/validation/validate';

function History(props) {
    return <li> 
        {props.startingLine}
        {props.endingLine}
        {props.age}
        {props.url}
        <ul>
            {props.oid}
            {props.name}
            {props.committedDate}
            {props.totalCount}
        </ul>
    </li>
}

function BlameFile() {
    const [error, setErrors] = useState({ ownername: { status: false, message: "" }, reponame: { status: false, message: "" }, ownername: { status: false, message: "" }, filepath: { status: false, messasge: "" } })
    const [form, setForm] = useState({ ownername: "CSC4350-TR", reponame: "GitHubGo", filepath: "https://github.com/CSC4350-TR/GitHubGo/tree/main/src/App.js" });
    const [validate, setValidate] = useState({ ownername: false, reponame: false, filename: true })
    const [isUser, setUser] = useState("org")
    const [fetchData, setFetchData] = useState({ userid: "", branches: new Set([]) })
    
    const [blamefileData, setfetchBlameFileData] = useState({ startingLine: 0, endingLine: 0, age: 0, name: "", oid:0, date: "", total:0, url:"", })
    const [show, setShow] = useState(false);
    
    const isSelected = (val) => isUser === val;
    const handleSelectChange = (e) => setUser(e.target.value);
    
    const handleInput = (e) => {
        setForm(i => ({ ...i, [e.target.name]: e.target.value }))
        setValidate(i => ({ ...i, [e.target.name]: false }))
    }
    
   const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await validateRepoStats(form.ownername, form.reponame, form.filepath, validate, isUser, fetchData);
        
        setErrors(i => ({ ...i, ...data.errors }))
        setValidate(Object.fromEntries(Object.entries(data.errors).map(i => [i[0], !i[1].status])))
        
        setFetchData(data.data)
        
        if (!data.result) return
        setfetchBlameFileData(await fetchBlameFileData(form.ownername, form.reponame, (data.data.branches.has("main")) ? "main" : data.data.branches.entries().next().value[0], data.data.userid))
        setShow(true);
        // console.log(repostatsData.datalist.map(i => i.additions))
    }
    
    return (
        <div className="flex items-center flex-col min-h-screen">
            <form className='flex flex-col gap-3 md:flex-row mt-4' onSubmit={handleSubmit}>
                <input spellCheck={false} title="Owner Name" className="bg-gray-50 p-3 rounded-md focus:outline-gray-200" type={'text'} name='ownername' placeholder="Owner Name" />
                <input spellCheck={false} title="Repository Name" className="bg-gray-50 p-3 rounded-md focus:outline-gray-200" type={'text'} name='reponame' placeholder="Repository Name" />
                <input spellCheck={false} title="File path" className="bg-gray-50 p-3 rounded-md focus:outline-gray-200" type={'text'} name='filepath' placeholder="File Path" />
                <button type={"submit"} className="p-3 text-white bg-blue-500 rounded-md focus:outline-blue-700">Submit</button>
            </form>
            
            <br/>
            
            {show?
            blamefileData?
            <div className='overflow-hidden w-full h-full'>
                <h2 className='text-center text-4xl font-semibold'>Visualization</h2>
                
                <h1> Blame File </h1>
                <ul>
                    {History.map((data) => < History info={data} />)}
                </ul>
                

                {/* <Tables headings={["startingLine", "endingLine", "age", "name", "committedDate", "totalCount"]} rows={blamefileData.datalist} /> */}

                
                
            </div>:<Loading />
            :null}
            
        </div>
    )
    
}



export default BlameFile
