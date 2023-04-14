import React, {useEffect, useState} from 'react';

const IndexPage = ({secret, email}) => {

  // const [posts, setPosts] = useState([])
  //
  // useEffect(() => {
  //   fetch("http://localhost:3800/getall")
  //     .then(res => res.json())
  //     .then( data => {
  //       setPosts(data.posts)
  //     })
  // }, [])


  return (
    <div>
      {/*{secret && <div> Welcome, {localStorage.getItem("username")}</div>}*/}
      {secret && <div> Welcome, {email} </div>}

      <div className="">
        Here will be future posts
      </div>

    </div>
  );
};

export default IndexPage;
