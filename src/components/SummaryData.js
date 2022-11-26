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
        // <div className='flex w-full justify-center h-[100vh]'>
        //     <div className='flex items-center justify-center w-full h-full'>
        //     <div className='flex py-14 flex-wrap md:items-end md:flex-row max-w-2xl border-t-2 border-b-2 border-gray-200 justify-around w-full text-center'>
        //         <div className='m-3 w-16'>
        //             <div className='text-3xl font-semibold p-4'>Repository commits</div>
        //             <div className='text-2xl'>{totalRepoCommit}</div>
        //         </div>
        //         <div className='m-3 w-16'>
        //             <div className='text-3xl p-4 font-semibold'>User commits</div>
        //             <div className='text-2xl'>{totalUserCommit}</div>
        //         </div>
        //         <div className='m-3 w-16'>
        //             <div className='text-3xl p-4 font-semibold'>Additions</div>
        //             <div className='text-2xl'>{totalAddition} <span className='text-green-600'>++</span></div>
        //         </div>
        //         <div className='m-3 w-16'>
        //             <div className='text-3xl p-4 font-semibold'>Deletions</div>
        //             <div className='text-2xl'>{totalDeletion} <span className='text-red-500'>--</span></div>
        //         </div>
        //     </div>
        //     </div>
        // </div>
    )
}

export default SummaryData