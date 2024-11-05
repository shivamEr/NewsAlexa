import React, { Component } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <NavBar title="NewsAlexa"/>

        <Routes>
          <Route exact path="/" element={<News key="gn" pageSize = {6} country = 'us' category = "general"/>}/>
          <Route exact path="/business" element={<News key="bs" pageSize = {6} country = 'us' category = "business"/>}/>
          <Route exact path="/entertainment" element={<News key="fun" pageSize = {6} country = 'us' category = "entertainment"/>}/>
          <Route exact path="/general" element={<News key="gn" pageSize = {6} country = 'us' category = "general"/>}/>
          <Route exact path="/health" element={<News key="hl" pageSize = {6} country = 'us' category = "health"/>}/>
          <Route exact path="/science" element={<News key="sc" pageSize = {6} country = 'us' category = "science"/>}/>
          <Route exact path="/sport" element={<News key="sp" pageSize = {6} country = 'us' category = "sport"/>}/>
          <Route exact path="/technology" element={<News key="tech" pageSize = {6} country = 'us' category = "technology"/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
