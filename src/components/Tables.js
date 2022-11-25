import React from 'react'

const Tables = ({ headings, rows }) => {
    const handlePathLink = (st) => {
        window.open(`https://github.com${st}`, '_blank')
    }
    const handleDataButton = ()  => {
        const header = headings.reduce((acc, i) => acc+i+",", "")
        const nrow = rows.reduce((accr, i) => {
            return accr+ i.additions+","+i.deletions +"," +i.committedDate.toString()+","+i.changedFilesIfAvailable+",\""+i.message.split("\n").map(i=> i.replace(/"/g, "'")).join(" ")+"\",https://github.com"+i.commitResourcePath +"\n"
        }, "")
        console.log(nrow)
        const blob = new Blob([header.slice(0, header.length-1)+"\n"+nrow], {type: "text/csv", endings: "native"})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',`GitHubData.csv`,);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }   
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center'>
            <h1 className='text-center  font-semibold text-4xl'>Data</h1>
            <br />
            <div className='w-full flex justify-center h-full'>
                <div className='max-w-4xl max-h-[480px] overflow-scroll scrollbar-hide'>
                    <table className='table-auto text-center rounded-md min-w-full p-2'>
                        <thead className=' sticky-md-top sticky bg-gray-50'>
                            <tr className='bg-gray-50'>
                                {headings.map(((i, k) => <th key={k + Math.random()} className='p-2 border-collapse border-l border-r '>{i}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length === 0 ? <tr className='text-center'><td></td><td>No data</td><td></td></tr> : rows.map(((i, k) => {
                                return <tr key={k + Math.random()} className=''>
                                    {Object.entries(i).map((k, idx) => {
                                        return (idx === 2) ? <td key={idx + Math.random()} className='p-2 border break-words'>{k[1].toString()}</td> : (idx === 5) ? <td key={idx + Math.random()} className='p-2 border break-words'><div className='cursor-pointer text-blue-600 underline break-words' onClick={() => handlePathLink(k[1])}>Path</div> </td> : <td key={idx + Math.random()} className='p-2 border break-words'>{k[1]}</td>
                                    })}
                                </tr>
                            }))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={handleDataButton} className='px-3 py-2 bg-blue-600 active:bg-blue-500 transition-all duration-300 rounded-md text-white'>Gimme Data!</button>
        </div>
    )
}

export default Tables