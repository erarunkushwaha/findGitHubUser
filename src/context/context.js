import React, { useState, useEffect } from "react";

import axios from "axios";

const rootUrl = "https://api.github.com";

const GitHubContext = React.createContext();

const GitHubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState({});
  const [repos, setRepos] = useState([{}]);
  const [followers, setFollowers] = useState([{}]);

  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      //repos
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => {
        setRepos(response.data);
      });

      // followers
      axios(`${followers_url}?per_page=100`).then((response) => {
        setFollowers(response.data);
      });
    } else {
      toggleError(true, "No user availabe with that username");
    }
    checkRequests();
    setIsLoading(false);
  };

  useEffect(() => {
    searchGithubUser("frenck");
  }, []);
  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);

        if (remaining === 0) {
          //    throw an error
          toggleError(true, "Only 60 request can be done in one hour");
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);

  return (
    <GitHubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}>
      {children}
    </GitHubContext.Provider>
  );
};
export { GitHubProvider, GitHubContext };
