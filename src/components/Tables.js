import React from 'react'

const Tables = ({ headings, rows }) => {
    return (
        <table className='table-auto text-center border rounded-md'>
            <thead>
                <tr>
                    {headings.map(((i,k) => <th key={k+Math.random()} className='p-2 border rounded-md'>{i}</th>))}
                </tr>
            </thead>
            <tbody>
                {rows.length === 0? <tr className='text-center'><td></td><td>No data</td><td></td></tr> :rows.map(((i,k) => {
                    return <tr key={k+Math.random()} className='p-2 border'>
                        {Object.entries(i).map((k, idx) => {
                            return (idx === 2) ? <td key={idx+Math.random()} className='p-2 border rounded-md'>{k[1].toString()}</td> : <td key={idx+Math.random()} className='p-2 border'>{k[1]}</td>
                        })}
                    </tr>
                }))}
            </tbody>
        </table>
    )
}

export default Tables