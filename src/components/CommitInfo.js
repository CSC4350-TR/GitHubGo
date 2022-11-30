import React from "react";

const CommitInfos = ({ selectedCommit }) => {
  return (
    <div className="w-full">
      <div>
        <span className="w-3 font-bold">Created by: &nbsp;</span>
        {selectedCommit.author.login}
      </div>
      <div>
        <span className="w-3 font-bold">SHA: &nbsp;</span> {selectedCommit.sha}
      </div>
      <div>
        <span className="w-3 font-bold">Message: &nbsp;</span>{" "}
        {selectedCommit.commit.message || "[Blank content]"}
      </div>
    </div>
  );
};

export default CommitInfos;
