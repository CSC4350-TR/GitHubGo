import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
                <h1 className=" text-6xl  break-words font-bold">
                    Welcome to <span className="text-blue-600"> GitHub Go!!! </span>
                    <br />
                </h1>
                <br />
                <div className='w-full'>
                    <Link to="/GitHubGo/repostats">
                        <button className='md:m-10 bg-blue-500 m-5 w-36 h-16 font-semibold text-white rounded-md
                            [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                            md:text-lg text-md
                            active:translate-x-3 select-none
                            active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] 
                            transition-all duration-[450ms]'>Repo Stats</button>
                    </Link>
                    <Link to="/GitHubGo/blamefile">
                        <button className='md:m-10 bg-blue-500 m-5 w-36 h-16 font-semibold text-white rounded-md
                            [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                            md:text-lg text-md
                            active:translate-x-3 select-none
                            active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] 
                            transition-all duration-[450ms]'>Blame File</button>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Home