import './App.css';
import React,{useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=>{
  const[mode,setmode]=useState("light")
    const[text,settext]=useState("Dark Mode")
    const togglebutton=()=>{
        if(mode==="light"){document.body.style.backgroundColor = "gray";
            setmode("dark");
            settext("Light Mode");
        }
        else{document.body.style.backgroundColor = "white";
            setmode("light");settext("Dark Mode");
        }
    }
  const pagesize=15;
  // to get api in secretive way we use the .env.local file and we can read abt this in custon env
  let apikey=process.env.REACT_APP_NEWS_API;
  const[progress,setProgress]=useState(0)
    return (
      <div>
        <Router>
          <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
      <Navbar text={text} togglebutton={togglebutton}/>
          <Routes>
            <Route exact path="/" element={<News apikey={apikey} mode={mode} setProgress={setProgress}  key="Home" pagesize={pagesize} country="us" category="general" />} />
            <Route exact path="/business"  element={<News apikey={apikey} mode={mode} setProgress={setProgress} pagesize={pagesize} key="business" country="us" category="business" />} />
            <Route exact path="/entertainment"  element={<News apikey={apikey} mode={mode} setProgress={setProgress} pagesize={pagesize} key="entertainment" country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News apikey={apikey} mode={mode} setProgress={setProgress} pagesize={pagesize} key="health"  country="us" category="health" />} />
            <Route exact path="/science" element={<News apikey={apikey} mode={mode} setProgress={setProgress} pagesize={pagesize} key="science" country="us" category="science" />} />
            <Route exact path="/sports"  element={<News apikey={apikey} mode={mode} setProgress={setProgress} pagesize={pagesize} key="sports" country="us" category="sports" />} />
            <Route exact path="/general"  element={<News apikey={apikey} mode={mode} setProgress={setProgress} pagesize={pagesize} key="general" country="us" category="general" />} />
            <Route exact path="/technology" element={<News apikey={apikey} mode={mode} setProgress={setProgress} pagesize={pagesize} key="technology" country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
  
export default  App;
