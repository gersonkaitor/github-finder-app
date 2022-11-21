import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GitHubContext from '../context/github/githubContext'

function User() {

    const { getUser, user } = useContext(GitHubContext);
    const params = useParams();

    useEffect(() =>{
        getUser(params.login);
    },[])

  return (
    <div>
      {user.login}
    </div>
  )
}

export default User
