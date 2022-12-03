import React, { useEffect, useState } from "react";
import PullInfos from "../components/PullInfos";
import axios from 'axios';

const RepoInfos = ({ username, selectedRepo }) => {
  const [repoInfo, setRepoInfo] = useState();
  const [repoContributor, setRepoContributor] = useState([]);
  const [repoPull, setRepoPull] = useState([]);
  const [selectedPull, setSelectedPull] = useState();


  useEffect(() => {
    if (!(username && selectedRepo)) {
      window.location.replace("/repostats");
      return;
    }
    const fetchRepoInfo = async () => {
      axios.get(`https://api.github.com/repos/${username}/${selectedRepo}`, {
        headers: {
          "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      })
        .then(async(result) => {
          setRepoInfo(result.data);

          if (result.data.contributors_url) {
            axios.get(
              `https://api.github.com/repos/${username}/${selectedRepo}/contributors`, {
              headers: {
                "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
              }
            })
              .then((result) => {
                setRepoContributor(result.data);
              }).catch(err => console.error(err.message));
          }

          axios.get(
            `https://api.github.com/repos/${username}/${selectedRepo}/pulls`, {
            headers: {
              "Authorization": `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
          })
            .then((result) => {
              setRepoPull(result.data);
            }).catch(err => console.error(err.message));
        }).catch(err => console.error(err.message));
    };
    fetchRepoInfo();
  }, [username, selectedRepo]);

  return (
    <>
      {repoInfo && (
        <div className="flex w-full items-center p-3">
          <div className="w-6/12">
            <div>
              <span className="w-3 font-bold">Repo Name: &nbsp;</span>
              {repoInfo.name}
            </div>
            <div>
              <span className="w-3 font-bold">Owner: &nbsp;</span>
              <a className="underline" href={repoInfo.owner.url}>
                {repoInfo.owner.login}
              </a>
            </div>
            {repoContributor.length && (
              <div>
                <span className="w-3 font-bold">Contributors: &nbsp;</span>
                {repoContributor.map((contributor, k) => (
                  <div key={k+"-contributor"} className="flex ml-6 mb-3 gap-3 items-center">
                    <img
                      className="w-12 h12 rounded-3xl"
                      src={contributor.avatar_url}
                      alt="contributor_avt"
                    />
                    <a className="underline" href={contributor.url}>
                      {contributor.login}
                    </a>
                  </div>
                ))}
              </div>
            )}

            {(repoInfo.topics && repoInfo.topics.length)? (
              <div>
                <span className="w-3 font-bold">Topics: &nbsp;</span>
                <div className="flex gap-1">
                  {repoInfo.topics.map((topic, k) => (
                    <div key={k+"t"} className="border border-solid p-1 bg-blue-300 w-max rounded">
                      {topic.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            ): null}

            <hr className="m-3 ml-0" />
            <div>
              <span className="w-3 font-bold">
                Current Pull Request Count: &nbsp;
              </span>
              {repoPull.length}
            </div>

            {!!repoPull.length && (
              <>
                <ol className="list-decimal">
                  {repoPull.map((pull) => (
                    <li
                      key={pull.id + "rp"}
                      className="underline cursor-pointer"
                      onClick={() => setSelectedPull(pull)}
                    >
                      {pull.body || "[Blank content]"}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>

          {!selectedPull ? (
            <div className="flex flex-col w-6/12">
              <div className="flex flex-col items-center">
                <img
                  className="w-6/12 border border-solid rounded-md"
                  src={repoInfo.owner.avatar_url}
                  alt="owner-avt"
                />
                <div className="w-full text-center p-3 font-bold">
                  {repoInfo.owner.login}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-6/12">
              <PullInfos selectedPull={selectedPull} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RepoInfos;
