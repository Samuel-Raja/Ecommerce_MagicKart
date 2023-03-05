
import {BiUserCircle} from 'react-icons/bi'
import React, { Fragment } from "react";
import MetaData from '../../../OrderCheckOut/MetaData'
import { Link } from "react-router-dom";
import './UserProfile.css'
import { useSelector } from 'react-redux';



const UserProfile = () => {
 

 

  const profileName = useSelector(state=> state.userdata.profileName)

  return (
   
    
        <Fragment>
          <MetaData title={`Profile`} />
           
          <div className="profileContainer">
            <div>
              <h1>Hello, {profileName}</h1>
              <div className='profile-photo' ><BiUserCircle style={{width :200, height: 200}} /></div>
              
              <div>
                <Link to="/UserLogin/ManageAddress">Manage Address</Link>
                <Link to="/UserLogin/ChangePassword">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
    
    
  );
};

export default UserProfile;