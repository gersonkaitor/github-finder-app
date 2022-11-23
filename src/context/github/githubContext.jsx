import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
//const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user:{},
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

   // Get Single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if(response.status === 404){
      window.location = '/notfound'
    }else{
      const data = await response.json();
  
      dispatch({
        type: "GET_USER",
        payload: data,
      });
     }
  };

  // Get user repos
  const getRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page : 10,
    })
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  // Clear user
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GitHubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
