import React, { useState } from 'react';
import { validateBlameFile } from '../utils/validation/validate';

const BlameFile = () => {
    const [error, setErrors] = useState({ username: { status: false, message: "" }, reponame: { status: false, message: "" }, ownername: { status: false, message: "" }, filepath: { status: false, messasge: "" } })
    const [form, setForm] = useState({ ownername: "CSC4350-TR", reponame: "GitHubGo", filepath: "https://github.com/CSC4350-TR/GitHubGo/README.md" });
    const [validate, setValidate] = useState({ ownername: false, reponame: false,  filepath: false })
    const [isUser, setUser] = useState("org")
    const isSelected = (val) => isUser === val;
    const handleSelectChange = (e) => setUser(e.target.value);
    const handleInput = (e) => {
        setForm(i => ({ ...i, [e.target.name]: e.target.value }))
        setValidate(i => ({ ...i, [e.target.name]: false }))
    }
    const fileValidate = () => {
        const re = new RegExp('.*\\..*$')
        if(!re.test(form.filepath)) return false
        if(form.filepath.startsWith(`https://github.com/${form.ownername}/${form.reponame}`)){
            let treepath = form.filepath.split(`https://github.com/${form.ownername}/${form.reponame}`)
            if(treepath.length !== 2) return false;
            
        }
        else if(form.filepath.startsWith(`https://www.github.com/${form.ownername}/${form.reponame}`)){

        }
        return false
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = await validateBlameFile(form.ownername, form.reponame, validate, isUser);
        setErrors(i => ({ ...i, ...data.errors }))
        setValidate(Object.fromEntries(Object.entries(data.errors).map(i => [i[0], !i[1].status])))
        if (!data.result) return
        if(!fileValidate()) return 
    }
    return (
        <div className="flex items-center max-w-7xl flex-col min-h-screen p-6 overflow-hidden">
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
                    <input spellCheck={false} value={form.filepath} title="File Path" onInput={e => handleInput(e)} className={`bg-gray-50 p-3 rounded-md focus:outline-gray-200 border-2 ${error.filepath.status ? "border-red-500 focus:outline-red-500" : "focus:outline-gray-200"}`} type={'text'} name='filepath' placeholder="File Path" required />
                    {error.filepath.status ? <div className='break-words text-xs text-red-600'>*{error.filepath.messasge}</div> : null}
                </div>
                <div>
                    <button type="submit" className="p-3 text-white bg-blue-500 rounded-md focus:outline-blue-700">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default BlameFile