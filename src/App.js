import "./App.css"
import React, { Component,useState } from 'react'
import Navbar from "./components/Navbar"
import News from "./components/News"
import LoadingBar from "react-top-loading-bar"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// export default class App extends Component {
  const App=()=>{

  const apiKey =  "5b302e435a0a42aca6ab118f4818a6bd"

  const[progress,setProgress]=useState(0);

  // state = {
  //   progress: 0,
  // }

  // setProgress = (progress) => {
  //   this.setState({
  //     progress: progress
  //   })
  // }

  // render() {
    return (
      <div>
        <Router>


          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Navbar />


          <Routes>
            <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="home" pageSize={20} country="in" category="general" />} />
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={20} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={20} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={20} country="in" category="general" />} />
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={20} country="in" category="health" />} />
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={20} country="in" category="science" />} />
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={20} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={20} country="in" category="technology" />} />
          </Routes>



        </Router>
      </div>









    )
  // }
}
export default App;
// }
