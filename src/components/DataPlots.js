import React from 'react'
// import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import Plot from 'react-plotly.js'

const DataPlots = ({ repostatsData }) => {
    return (
        <div className='w-full flex flex-wrap justify-center'>
            <div className='overflow-x-scroll scrollbar-hide'>
            <Plot
                data={[
                    {
                        x: repostatsData.datalist.map(i => i.committedDate),
                        y: repostatsData.datalist.map(i => i.additions),
                        type: 'scattergl',
                        mode: 'lines+markers',
                        name: 'additions',
                        fill: 'tozeroy',
                        marker: { color: 'darkorchid' },
                    },
                    {
                        x: repostatsData.datalist.map(i => i.committedDate),
                        y: repostatsData.datalist.map(i => i.deletions),
                        type: 'scattergl',
                        mode: 'lines+markers',
                        fill: 'tozeroy',
                        name: 'deletions',
                        marker: { color: 'mediumseagreen' },
                    }
                ]}
                layout={{ title: 'Activity', legend: { orientation: 'h', y: 200 }, xaxis: { title: 'Dates' }, yaxis: { title: 'Additions and Deletions' } }}
            />
            </div>
            <div className='flex flex-wrap flex-col items-center sm:flex-row sm:justify-center'>
                <Plot
                    data={[
                        {
                            values: [repostatsData.totalRepoCommit ? 100 - Math.round((repostatsData.totalUserCommit / (repostatsData.totalRepoCommit ? repostatsData.totalRepoCommit : 1)) * 100) : 0, Math.round((repostatsData.totalUserCommit / (repostatsData.totalRepoCommit ? repostatsData.totalRepoCommit : 1)) * 100)],
                            labels: ['Others', 'User'],
                            type: 'pie',
                            marker: { colors: ['#7089FF', 'royalblue'] },
                        }
                    ]}
                    className="max-w-lg"
                    layout={{ width: 300, height: 300, title: 'Commit Contribution' }}
                />
                <Plot
                    data={[
                        {
                            values: [repostatsData.totalDeletion, repostatsData.totalAddition],
                            labels: ['Deletions', 'Additions'],
                            type: 'pie',
                            marker: { colors: ['#7089FF', 'royalblue'] }
                        }
                    ]}
                    layout={{ width: 300, height: 300, title: 'Additions-Deletions' }}
                    className="max-w-lg"
                />
            </div>
        </div>
    )
}

export default DataPlots