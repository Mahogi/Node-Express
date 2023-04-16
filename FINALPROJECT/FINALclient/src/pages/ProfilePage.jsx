import React, {useRef, useState} from 'react';
import {Snackbar} from '@mui/material';

const ProfilePage = ({secret, image, updatePhoto, email,setEmail}) => {

  const [openPhotoSnackbar, setOpenPhotoSnackbar] = React.useState(false);
  const [openEmailSnackbar, setOpenEmailSnackbar] = React.useState(false);
  const [openPassSnackbar, setOpenPassSnackbar] = React.useState(false);
  const [getError, setError] = useState(null);

  const editEmailRef = useRef();
  const editPasswordRef = useRef();
  const editPhotoRef = useRef();

  const handlePhotoClick = () => {
    setOpenPhotoSnackbar(true);
    setError(null);
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
    <div className="margin-auto width-500">
      {secret && <div className="welcome"> Welcome, {email} </div>}
      {getError && <div className="error"> {getError} </div>}


      <div className="d-flex column margin-auto">
        <h1>PROFILE PAGE</h1>
        <img src={image} alt="profile photo" className="p-1 profilePhoto margin-auto"/>
        <div>
          <input
            ref={editPhotoRef}
            type="text"
            placeholder="url"
            style={{width: '77%'}}
            className="line-height-30 mh-1"/>
          <button onClick={() => {
            updatePhoto(editPhotoRef.current.value);
            handlePhotoClick();
          }} className="line-height-30">Update photo</button>
        </div>

        <Snackbar
          open={openPhotoSnackbar}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Photo was edited successfully!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        </Snackbar>
        <div className="">
          <input
            ref={editEmailRef}
            type="text"
            defaultValue={email}
            style={{width: '77%'}}
            className="line-height-30 mh-1"
          />
          <button onClick={
            async () => await updateEmail(editEmailRef.current.value)
          } className="line-height-30">Update email</button>
          <Snackbar
            open={openEmailSnackbar}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Email was edited successfully!"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          </Snackbar>
        </div>
        <div className="">
          <input
            ref={editPasswordRef}
            type="text"
            style={{width: '72%'}}
            className="line-height-30 mh-1"/>
          <button onClick={
            async () => await updatePassword(editPasswordRef.current.value)
          } className="line-height-30">Update password</button>
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


    </div>
  );
};

export default ProfilePage;
