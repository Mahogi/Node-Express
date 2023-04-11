import React, {useEffect, useState} from 'react';
import CreateGifForm from "../components/CreateGifForm.jsx";
import SingleGif from "../components/SingleGif.jsx";

const IndexPage = ({secret}) => {


  const [gifs, setGifs] = useState([])

  useEffect(() => {
    fetch("http://localhost:3500/getall")
      .then(res => res.json())
      .then( data => {
        setGifs(data.gifs)
      })
  }, [])


  return (
    <div>
      {secret && <CreateGifForm set={setGifs}/>}

      <div className="d-flex flex-wrap">

        {gifs.map((x, i) => <SingleGif item={x} key={i}/>)}

      </div>
    </div>
  );
};

export default IndexPage;