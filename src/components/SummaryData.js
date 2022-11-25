import React from 'react'

const SummaryData = ({ totalUserCommit, totalAddition, totalDeletion, totalRepoCommit }) => {
    return (
        <div className='flex w-full justify-center mb-9'>
            <div className='flex py-14 flex-col md:items-end md:flex-row rounded-md max-w-2xl justify-around w-full text-center'>
                <div className='m-3'>
                    <div className='text-3xl font-semibold p-4'>Repository commits</div>
                    <div className='text-2xl'>{totalRepoCommit}</div>
                </div>
                <div className='m-3'>
                    <div className='text-3xl p-4 font-semibold'>User commits</div>
                    <div className='text-2xl'>{totalUserCommit}</div>
                </div>
                <div className='m-3'>
                    <div className='text-3xl p-4 font-semibold'>Additions</div>
                    <div className='text-2xl'>{totalAddition} <span className='text-green-600'>++</span></div>
                </div>
                <div className='m-3'>
                    <div className='text-3xl p-4 font-semibold'>Deletions</div>
                    <div className='text-2xl'>{totalDeletion} <span className='text-red-500'>--</span></div>
                </div>
            </div>
        </div>
    )
}

export default SummaryData