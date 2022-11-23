import React from 'react'

const SummaryData = ({totalUserCommit, totalAddition, totalDeletion, totalRepoCommit}) => {
    return (
        <div className='flex py-14 flex-col md:flex-row rounded-md max-w-lg justify-around w-full text-center'>
            <div className='m-3'>
                <div className='text-xl'>Contribution</div>
                <div>{Math.round((totalUserCommit/(totalRepoCommit === 0? 1: totalRepoCommit))*100)}%</div>
            </div>
            <div className='m-3'>
                <div className='text-xl'>Total User Commits</div>
                <div>{totalUserCommit}</div>
            </div>
            <div className='m-3'>
                <div className='text-xl'>Total Additions</div>
                <div>{totalAddition}</div>
            </div>
            <div className='m-3'>
                <div className='text-xl'>Total Deletions</div>
                <div>{totalDeletion}</div>
            </div>
        </div>
    )
}

export default SummaryData