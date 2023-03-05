
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './AccountLogin/UserComponents/Layout/Layout';
import UserProfile from './AccountLogin/UserComponents/Profile/UserProfile';
import AuthPage from './AccountLogin/UserPages/AuthPage';

import ProfileForm from './AccountLogin/UserComponents/Profile/ProfileForm';
import ManageAddress from './AccountLogin/UserComponents/Profile/ManageAddress.js';
import { useSelector } from 'react-redux';

function UserLogin() {

  

  const isLoggedin = useSelector(state => state.userdata.IsUserLoggedin )

  return (
    <Layout>
      <Routes>
       
        { !isLoggedin && 
        <Route path='/auth' element = {<AuthPage/>} />
         
         }


        { isLoggedin &&
        <Route path='/profile' element = {<UserProfile />}  />
        }

      
        { isLoggedin &&
        <Route path='/ChangePassword' element = {<ProfileForm />}  />
        }

        { isLoggedin &&
        <Route path='/ManageAddress' element = {<ManageAddress/>}  />
        }

       
      { !isLoggedin &&
      
        <Route path='/UserLogin' element =  {<Navigate to= '/auth' />} />
        
      

      }

      {/* { isLoggedin  &&
      
      <Route path='*' element = { <Navigate to= '/' />} />
     
   

    } */}

      </Routes>
    </Layout>
  );
}

export default UserLogin;
