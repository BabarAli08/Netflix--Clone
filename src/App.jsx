import Homescreen from './Screens/Homescreen'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './Screens/About.jsx';
import Users from './Screens/Users.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import { useEffect } from 'react';
import { auth } from './Firebase.js';
import {useDispatch, useSelector} from "react-redux"
import { logIn, logOut, selectUser } from './app/features/counter/UserSlice.js';
import ProfileScreen from './Screens/profileScreen.jsx';


function App() {
  const user = useSelector(selectUser) 
  const dispatch=useDispatch()

  useEffect(()=>{
    const unSubscribe=auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        dispatch(logIn({
          uid:userAuth.uid,
          email:userAuth.email,

        }))
      }
      else{

        dispatch(logOut())
      }

    })
    return unSubscribe    
  },[dispatch])
  return (
    <Router>
      <Routes>
      
        {!user ? (
          <Route path="*" element={<LoginScreen />} />
        ) : (
          <>
            <Route path="/" element={<Homescreen />} />
            <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
          
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
