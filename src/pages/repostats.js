import React, { useEffect, useState } from "react";
import RepoInfo from "../components/RepoInfos";

const RepoStats = () => {
  const [username, setUsername] = useState("");
  const [repoList, setRepoList] = useState();
  const [isNotFound, setIsNotFound] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");

  const fetchGitHubUsername = async (e) => {
    e.preventDefault();
    const usernameInput = e.target.username.value;

    fetch(`https://api.github.com/users/${usernameInput}/repos`)
      .then((res) => res.json())
      .then((result) => {
        if (result?.message === "Not Found") setIsNotFound(true);
        else {
          setIsNotFound(false);
          setRepoList(result);
          setUsername(usernameInput);
        }
      });
  };

  const clearAllInput = () => {
    setUsername();
    setRepoList();
    setSelectedRepo();
  };

  return (
    <div className="w-screen h-screen">
      {!repoList?.length ? (
        <form
          id="userRepoForm"
          className="flex flex-col w-1/4 absolute"
          style={{ top: "40%", left: "40%" }}
          onSubmit={(e) => fetchGitHubUsername(e)}
        >
          <label htmlFor="username" className="font-bold">
            Username
          </label>
          <input
            className="mb-3 p-3 border border-solid rounded "
            name="username"
            type="text"
            placeholder="Enter the github username..."
          />
          {isNotFound && (
            <span className="text-red-500 p-1 pl-0">
              Not found any repositories!
            </span>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold p-3 rounded"
          >
            Search
          </button>
        </form>
      ) : (
        <div className="p-6">
          {!selectedRepo ? (
            <>
              <h1 className="text-4xl p-3 pl-0">Select your Repository</h1>
              <div className="flex flex-wrap">
                {repoList.map((repo, index) => (
                  <button
                    key={index}
                    className="basis-4/12 p-3 border border-solid text-center cursor-pointer"
                    onClick={() => setSelectedRepo(repo.name)}
                  >
                    {repo.name}
                  </button>
                ))}
              </div>
              <button
                className="bg-blue-500 text-white font-bold mt-3 p-3 rounded w-full"
                onClick={() => clearAllInput()}
              >
                Go back
              </button>
            </>
          ) : (
            <>
              <RepoInfo username={username} selectedRepo={selectedRepo} />

              <button
                className="bg-blue-500 text-white font-bold mt-3 p-3 rounded w-full"
                onClick={() => setSelectedRepo()}
              >
                Go back
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RepoStats;
