import React, { useEffect, useState } from "react";
import CommitInfos from "../components/CommitInfo";
import axios from 'axios';

const PullInfos = ({ selectedPull }) => {
  const [commitInfo, setCommitInfo] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState();

  useEffect(() => {
    if (!selectedPull) return;
    axios.get(selectedPull.commits_url, {
      headers: {
        "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })
      .then((result) => {
        setCommitInfo(result.data);
      }).catch(err => console.error(err.message));
  }, [selectedPull]);
  return (
    <div className="pl-3 pr-3 w-full">
      {!selectedCommit ? (
        <>
          <div>
            <span className="w-3 font-bold underline">Total commits:</span>{" "}
            {commitInfo.length}
          </div>

          {!!commitInfo.length && (
            <>
              <ol className="list-decimal">
                {commitInfo.map((commit) => (
                  <li
                    key={commit.node_id}
                    className="cursor-pointer w-fit"
                    onClick={() => setSelectedCommit(commit)}
                  >
                    <span className="w-3 font-bold">Committer: </span>
                    <span>{commit.committer.login} &nbsp;</span>
                    <span className="underline text-blue-500">Details</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </>
      ) : (
        <>
          <button className="text-blue-500" onClick={() => setSelectedCommit()}>
            {" "}
            &lt;Back
          </button>
          <CommitInfos selectedCommit={selectedCommit} />
        </>
      )}
    </div>
  );
};

export default PullInfos;
