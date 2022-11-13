import React from 'react'

const BlameFile = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="flex items-center flex-col min-h-screen">
            <form className='flex flex-col gap-3 md:flex-row mt-4' onSubmit={handleSubmit}>
                <input spellCheck={false} title="Owner Name" className="bg-gray-50 p-3 rounded-md focus:outline-gray-200" type={'text'} name='ownername' placeholder="Owner Name" />
                <input spellCheck={false} title="Repository Name" className="bg-gray-50 p-3 rounded-md focus:outline-gray-200" type={'text'} name='reponame' placeholder="Repository Name" />
                <input spellCheck={false} title="Username" className="bg-gray-50 p-3 rounded-md focus:outline-gray-200" type={'text'} name='username' placeholder="Username" />
                <input spellCheck={false} title="File path" className="bg-gray-50 p-3 rounded-md focus:outline-gray-200" type={'text'} name='filepath' placeholder="File Path" />
                <button type={"submit"} className="p-3 text-white bg-blue-500 rounded-md focus:outline-blue-700">Submit</button>
            </form>
        </div>
    )
}

export default BlameFile