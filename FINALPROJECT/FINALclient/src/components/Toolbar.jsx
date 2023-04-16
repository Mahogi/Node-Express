import React from 'react';
import {Link} from "react-router-dom";

const Toolbar = ({image, logout}) => {

  return (
    <div className="d-flex space-btw">
      <div>
        <Link to="/login" className="m-3 button">Login</Link>
        <Link to="/register" className="m-3 button">Register</Link>
        <Link to="/" className="m-3 button">Home Page</Link>

      </div>
      <h1>What chocolate did you eat today?</h1>
      <div>
        {image &&
          <>
          <div className="d-flex">
            <img className="profileImage" src={image} alt=""/>
            <div className="d-flex column space-even">
              <Link to="/profile" className="button">My Profile</Link>
              <button onClick={logout} className="button">Logout</button>
            </div>
          </div>
          </>
        }

      </div>

    </div>
  );
};

export default Toolbar;