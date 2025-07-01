import Homescreen from './Screens/Homescreen'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './Screens/About.jsx';
import Users from './Screens/Users.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import { useEffect } from 'react';
import { auth } from './Firebase.js';

function App() {
  const user = null 

  useEffect(()=>{
    const unSubscribe=auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        console.log(userAuth)
      }
      else{

      }

    })
    return unSubscribe    
  },[])
  return (
    <Router>
      <Routes>
      
        {!user ? (
          <Route path="*" element={<LoginScreen />} />
        ) : (
          <>
            <Route path="/" element={<Homescreen />} />
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
