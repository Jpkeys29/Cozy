import './App.css';
import { useEffect, useState } from "react"
import FlatDetail from "./components/FlatDetail"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import Profile from "./components/Profile"
import PostRoom from "./components/PostRoom"
import SignUp from './components/SignUp';
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/config"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Link, useParams } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import SignIn from './components/SignIn';
import RenderedProfile from './components/RenderedProfile';
import PostingSearched from './components/PostingSearched';
import PostingDetails from './components/PostingDetails';

function App() {
  console.log("auth", auth.currentUser)
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <BrowserRouter>
      <div>
        <Header handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/flat/:slug" element={<FlatDetail />}></Route>
          <Route path='/signup' element={<SignUp setUser={setUser} />} ></Route>
          <Route path='/posting-searched' element={< PostingSearched/>} />
          <Route path='/posting-details' element={<PostingDetails/>}  />
          <Route
            path="/postroom"
            element={
              user ? (<PostRoom />) : (
                <>
                  <SignIn setUser={setUser} />
                </>
              )
            }>
          </Route>
          <Route
            path="/profile"
            element={
              user ? (<Profile />) : (<SignIn setUser={setUser} />)
            }></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
