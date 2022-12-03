import React from 'react'
import loading_spin from '../assets/loading-spinner.gif'

const Loading = () => {
  return (
    <div className='w-full flex justify-center'><img className='w-10 h-10' src={loading_spin} alt="loading gif" /></div>
  )
}

export default Loading