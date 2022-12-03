import React from 'react'

const SummaryData = ({ totalUserCommit, totalAddition, totalDeletion, totalRepoCommit }) => {
    return (
        <div className='flex w-full text-center justify-center items-center h-[60vh] md:h-[100vh]'>
            <div className='grid grid-cols-2 gap-8  md:grid-cols-4 md:gap-2'>
                <div className='flex flex-col justify-between'>
                    <div className='font-semibold text-4xl'>Repository Commits</div>
                    <div className='p-2 text-3xl'>{totalRepoCommit}</div>   
                </div>
                <div className='flex flex-col justify-between '>
                    <div className='font-semibold text-4xl'>User Commits</div>
                    <div className='p-2 text-3xl'>{totalUserCommit}</div>
                </div>
                <div className='flex flex-col justify-between'>   
                    <div className='font-semibold text-4xl'>Additions</div>
                    <div className='p-2 text-3xl'>{totalAddition} <span className='text-green-600'>++</span></div>
                </div>
                <div className='flex flex-col justify-between'>
                    <div className='font-semibold text-4xl'>Deletions</div>
                    <div className='p-2 text-3xl'>{totalDeletion} <span className='text-red-500'>--</span></div>
                </div>
            </div>

        </div>
    )
}

export default SummaryData