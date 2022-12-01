import React, { useEffect, useState } from "react";

const CommitInfos = ({ selectedCommit }) => {
  const [commentInfo, setCommentInfo] = useState([]);

  useEffect(() => {
    fetch(selectedCommit.comments_url)
      .then((res) => res.json())
      .then((result) => {
        console.log("Comments");
        console.log(result);
        setCommentInfo(result);
      });
  }, [selectedCommit]);
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
      <div>
        <span className="w-3 font-bold">Comments: </span>{" "}
        {!commentInfo.length ? <i>No comments</i> : <>

        </>}
      </div>
    </div>
  );
};

export default CommitInfos;
