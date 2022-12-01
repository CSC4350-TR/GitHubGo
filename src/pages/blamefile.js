import React, { useRef, useState } from 'react';
import Loading from '../components/Loading';
import { validateBlameFile } from '../utils/validation/validate';
import { fetchBlameFileData } from '../utils/blamefileQueries/blamefileDataFetcher';


function BlameFile() {
    const [error, setErrors] = useState({ ownername: { status: false, message: "" }, reponame: { status: false, message: "" }, username: { status: false, message: "" }, filepath: { status: false, messasge: "" } })
    const [form, setForm] = useState({ ownername: "", reponame: "", filepath: "" });
    const [validate, setValidate] = useState({ ownername: false, reponame: false, filepath: false, username: true })
    const [isUser, setUser] = useState("user");
    const branch = useRef("HEAD")
    const [isloading, setLoading] = useState(false)
    const relativeFilePath = useRef("")
    const [fileContent, setFileContent] = useState([])
    const [isBinary, setIsBinary] = useState(false)
    const [show, setShow] = useState(false);

    const isSelected = (val) => isUser === val;
    const handleSelectChange = (e) => setUser(e.target.value);

    const handleInput = (e) => {
        setForm(i => ({ ...i, [e.target.name]: e.target.value }))
        setValidate(i => ({ ...i, [e.target.name]: false }))
    }

    const fileValidate = () => {
        const validLinkPath = new RegExp(`^https://(www\\.)?github.com/${form.ownername}/${form.reponame}/([^\\\\:?*<>|]+/)*[^\\\\:?*<>|/]*\\.[a-zA-Z]+$`)
        if (!validLinkPath.test(form.filepath)) {
            setErrors(i => ({ ...i, filepath: { status: true, messasge: "please provide a valid file path" } }))
            return false
        }
        let branchpath = form.filepath.split(new RegExp(`^https://(www\\.)?github.com/${form.ownername}/${form.reponame}/(tree/|blob/)?`))[3]
        let breakpoint = branchpath.indexOf("/")
        if (breakpoint === -1) {
            branch.current = "HEAD"
            relativeFilePath.current = branchpath
        }
        else {
            let b = branchpath.slice(0, breakpoint)
            let relativefilepath = branchpath.slice(breakpoint + 1)
            branch.current = b
            relativeFilePath.current = relativefilepath
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await validateBlameFile(form.ownername, form.reponame, validate, isUser).catch(err => console.error(err.message));
        setErrors(i => ({ ...i, ...data.errors }))
        setValidate(Object.fromEntries(Object.entries(data.errors).map(i => [i[0], !i[1].status])))
        if (!data.result) return
        if (!fileValidate()) return
        setLoading(true)
        const res = await fetchBlameFileData(form.ownername, form.reponame, branch.current, relativeFilePath.current).catch(err => console.error(err.message))
        if ("invalidLink" in res) {
            setValidate(i => ({ ...i, filepath: false }))
            setErrors(i => ({ ...i, filepath: { messasge: "invalid link", status: true } }))
            setLoading(false)
            return
        } 
        if ("isbinary" in res) {
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
        <div className="flex mx-auto items-center max-w-7xl flex-col min-h-screen p-6 overflow-hidden">
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
            <div className='rounded-md overflow-hidden w-11/12  bg-[#0d1117]'>
                {isloading ?
                    <Loading />
                    :
                    show ?
                        isBinary ?
                            <div className='flex justify-center items-center h-[50vh] w-full'>
                                <div className='text-white '>The file is not supported.</div>
                            </div> :

                            <div className='flex flex-col overflow-x-scroll text-white text-xs'>
                                {fileContent.map((i, ky) =>
                                    <div key={ky + "box"} className='flex w-full border-b border-[#474747]'>
                                        <div className='self-stretch'>
                                            <div className='p-2 w-[480px] truncate flex justify-between items-center'>
                                                <div className='flex w-[420px]'>
                                                    <span className='px-2 w-[40px]'><a href={i[0].author.user.url} title={`${i[0].author.user.login}`} rel="noreferrer" target="_blank" ><img className='w-4 h-4 flex-grow-0 flex-shrink-0 rounded-lg' src={i[0].author.user.avatarUrl} alt="author avatar" /></a></span>
                                                    <span className='flex-grow-0 flex-shrink-0 hover:underline truncate w-[360px]'><a href={i[0].url} rel="noreferrer" title="user commit path" target="_blank">{i[0].message}</a></span>
                                                </div>
                                                <div className='text-[0.7rem] w-[70px]'>{(new Date(i[0].committedDate)).toLocaleString('en-US', {year: 'numeric', month: 'short', day: '2-digit'})}</div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col w-full'>
                                            {i[1].map((k, l) => <div key={l + "lines"} className='flex'>
                                                <div className="p-2 flex-grow-0 flex-shrink-0 w-16 bg-[#161b22] text-[#6e7681] flex justify-end">{l + i[2]} </div>
                                                <div className="p-2 flex-grow-0 flex-shrink-0">{k}</div>
                                            </div>)}
                                        </div>
                                    </div>)}
                            </div>
                        : null
                }
            </div>

        </div>
    )

}



export default BlameFile
