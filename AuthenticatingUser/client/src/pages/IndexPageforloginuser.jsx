import LoginForm from "../components/LoginForm";
import {useEffect} from "react";

const IndexPage = ({setUser}) => {

  useEffect(() => {
    const secret = localStorage.getItem('userSecret')


    if(secret) {
      console.log("I have no idea whats happening")
    }


  }, [])

  return (
    <div className="d-flex j-center">
      <LoginForm setUser={setUser}/>
    </div>
  );
};

export default IndexPage;