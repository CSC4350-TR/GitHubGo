import React, { useRef, useState } from 'react';
import Loading from '../components/Loading';
import { validateBlameFile } from '../utils/validation/validate';
// import Tables from '../components/Tables';
import { fetchBlameFileData } from '../utils/blamefileQueries/blamefileDataFetcher';

// function History(props) {
//     return <li>
//         {props.startingLine}
//         {props.endingLine}
//         {props.age}
//         {props.url}
//         <ul>
//             {props.oid}
//             {props.name}
//             {props.committedDate}
//             {props.totalCount}
//         </ul>
//     </li>
// }

function BlameFile() {
    const [error, setErrors] = useState({ ownername: { status: false, message: "" }, reponame: { status: false, message: "" }, username: { status: false, message: "" }, filepath: { status: false, messasge: "" } })
    const [form, setForm] = useState({ ownername: "CSC4350-TR", reponame: "GitHubGo", filepath: "https://github.com/CSC4350-TR/GitHubGo/tree/main/src/App.js" });
    const [validate, setValidate] = useState({ ownername: false, reponame: false, filepath: false, username: true })
    const [isUser, setUser] = useState("org");
    const  branch = useRef("HEAD")
    const [isloading, setLoading] = useState(false)
    const relativeFilePath = useRef("")
    const [fileContent, setFileContent] = useState([])
    const  [isBinary, setIsBinary] = useState(false)

    // const [blamefileData, setfetchBlameFileiData] = useState({ startingLine: 0, endingLine: 0, age: 0, name: "", oid: 0, date: "", total: 0, url: "", })
    const [show, setShow] = useState(false);

    const isSelected = (val) => isUser === val;
    const handleSelectChange = (e) => setUser(e.target.value);

    const handleInput = (e) => {
        setForm(i => ({ ...i, [e.target.name]: e.target.value }))
        setValidate(i => ({ ...i, [e.target.name]: false }))
    }

    const fileValidate = () => {
        const validLinkPath = new RegExp(`^https://(www\\.)?github.com/${form.ownername}/${form.reponame}/([^\\\\:?*<>|]+/)*[^\\\\:?*<>|/]+\\.[a-zA-Z]+$`)
        if(!validLinkPath.test(form.filepath)) {
            setErrors(i => ({...i, filepath: { status: true, messasge: "please provide a valid file path"}}))
            return false
        }
        let branchpath = form.filepath.split(new RegExp(`^https://(www\\.)?github.com/${form.ownername}/${form.reponame}/(tree/)?`))[3]
        let breakpoint = branchpath.indexOf("/")
        if(breakpoint === -1){
            branch.current = "HEAD"
            relativeFilePath.current = branchpath
        } 
        else{
            let b = branchpath.slice(0, breakpoint)
            let relativefilepath = branchpath.slice(breakpoint+1)
            branch.current = b
            relativeFilePath.current = relativefilepath
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await validateBlameFile(form.ownername, form.reponame, validate, isUser);
        setErrors(i => ({ ...i, ...data.errors }))
        setValidate(Object.fromEntries(Object.entries(data.errors).map(i => [i[0], !i[1].status])))
        if (!data.result) return
        if (!fileValidate()) return
        setLoading(true)
        const res = await fetchBlameFileData(form.ownername, form.reponame, branch.current, relativeFilePath.current)
        if("invalidLink" in res){
            setValidate(i => ({...i, filepath: false}))
            setErrors(i=> ({...i, filepath: {messasge:"invalid link", status: true} }))
            setLoading(false)
            return
        }
        if("isbinary" in res){
            setIsBinary(true)
            setShow(true)
            setFileContent([])
            setLoading(false)
            return
        }
        setIsBinary(false);
        setShow(true)
        setFileContent(res.fileContent);
        setLoading(false)
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

            <br />
            <div className=' overflow-x-scroll w-11/12'>

            {isloading?
                <Loading />
                :
                show?
                isBinary?
                    <div>
                        File is not supported 
                    </div>:
                fileContent.map((i, line) => <div key={"line"+line} className='text-sm grid grid-cols-12 p-1'> 
                    <div className='text-xs col-span-1 py-2 flex items-center justify-end bg-gray-200 text-right'>{line}</div><div className='col-span-11 display flex w-full text-left pl-4  whitespace-nowrap'> {i} </div>
                
                </div>
                ):null
            }
            </div>

            {/* {show ?
                blamefileData ?
                    <div className='overflow-hidden w-full h-full'>
                        <h2 className='text-center text-4xl font-semibold'>Visualization</h2>
                        <h1> Blame File </h1>

                    </div> : <Loading />
                : null} */}

        </div>
    )

}



export default BlameFile
