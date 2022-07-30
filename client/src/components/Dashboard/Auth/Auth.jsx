import Login from "./Login/Login"
import { useQuery } from "react-query"
import authBackend from "../../../backend/auth.backend"
import Loader from "../../Loader/Loader"

const Auth = ({children}) => {

  const authState = useQuery('authState', authBackend.getAuthState, {
    retry: false
  })

  return (
    <>
      {
        authState.isLoading ? <Loader display='block' minHeight='60vh'/> : ''
      }
      {
        authState.isError ? <Login /> : ''
      }
      {
        authState.isSuccess ? children : ''
      }
    </>
  )
}

export default Auth