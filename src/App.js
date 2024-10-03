import './App.css';
import FlatDetail from "./components/FlatDetail"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import Profile from "./components/Profile"
import PostRoom from "./components/PostRoom"
import BlogDetail from "./components/BlogDetail"
import {BrowserRouter as Router,Route} from "react-router-dom";
 

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route path="/" exact component={Home}></Route>
        <Route path="/contact"  component={Contact}></Route>
        <Route path="/profile"  component={Profile}></Route>
        <Route path="/postroom" exact component={PostRoom}></Route>
        <Route path="/blog/:id"  component={BlogDetail}></Route>
        <Route path="/flat/:slug"  component={FlatDetail}></Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
