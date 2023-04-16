import React, {useRef, useState} from 'react';
import {Snackbar} from '@mui/material';

const ProfilePage = ({secret, image, updatePhoto, email,setEmail}) => {

  // const [posts, setPosts] = useState([])
  //
  // useEffect(() => {
  //   fetch("http://localhost:3800/getall")
  //     .then(res => res.json())
  //     .then( data => {
  //       setPosts(data.posts)
  //     })
  // }, [])

  const [openPhotoSnackbar, setOpenPhotoSnackbar] = React.useState(false);
  const [openEmailSnackbar, setOpenEmailSnackbar] = React.useState(false);
  const [openPassSnackbar, setOpenPassSnackbar] = React.useState(false);
  const [getError, setError] = useState(null);

  const editEmailRef = useRef();
  const editPasswordRef = useRef();
  const editPhotoRef = useRef();

  const handlePhotoClick = () => {
    setOpenPhotoSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPhotoSnackbar(false);
    setOpenEmailSnackbar(false);
    setOpenPassSnackbar(false);
  };

  const updateEmail = (newMail) => {
    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify({
        secret,
        newMail
      })
    };

    fetch("http://localhost:3800/updateEmail", options)
      .then(res => res.json())
      .then( data => {
        if(data.success) {
          console.log(data);
          console.log(newMail);
          setEmail(newMail);
          setError(null);
          setOpenEmailSnackbar(true);
          return true;
        } else {
          setError(data.message);
          setOpenEmailSnackbar(false);
          return false;
        }
      });
  };

  const updatePassword = (newPass) => {
    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify({
        secret,
        newPass
      })
    };

    fetch("http://localhost:3800/updatePassword", options)
      .then(res => res.json())
      .then( data => {
        if(data.success) {
          setError(null);
          setOpenPassSnackbar(true);
        } else {
          setError(data.message);
          setOpenPassSnackbar(false);
        }
      });
  };

  return (secret &&
    <div>
      {/*{secret && <div> Welcome, {localStorage.getItem("username")}</div>}*/}
      {secret && <div> Welcome, {email} </div>}
      {getError && <div className="error"> {getError} </div>}

      <div className="">
        PROFILE PAGE
      </div>
      <div className="d-flex column">
        <img src={image} alt="profile photo" className="p-1 profilePhoto"/>
        <div>
          <input ref={editPhotoRef} type="text" placeholder="url"/>
          <button onClick={() => {
            updatePhoto(editPhotoRef.current.value);
            handlePhotoClick();
          }}>Update photo</button>
        </div>

        <Snackbar
          open={openPhotoSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Photo was edited successfully!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        </Snackbar>
      </div>
      <div>
        <input ref={editEmailRef} type="text" defaultValue={email}/>
        <button onClick={
          async () => await updateEmail(editEmailRef.current.value)
        }>Update email</button>
        <Snackbar
          open={openEmailSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Email was edited successfully!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        </Snackbar>
      </div>
      <div>
        <input ref={editPasswordRef} type="text"/>
        <button onClick={
          async () => await updatePassword(editPasswordRef.current.value)
        }>Update password</button>
        <Snackbar
          open={openPassSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Password was edited successfully!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        </Snackbar>
      </div>
    </div>
  );
};

export default ProfilePage;
