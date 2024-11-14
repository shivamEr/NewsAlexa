import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress)=> {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar title="NewsAlexa" />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="gn" pageSize={6} country='us' category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="bs" pageSize={6} country='us' category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="fun" pageSize={6} country='us' category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="gn" pageSize={6} country='us' category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="hl" pageSize={6} country='us' category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="sc" pageSize={6} country='us' category="science" />} />
            <Route exact path="/sport" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="sp" pageSize={6} country='us' category="sport" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="tech" pageSize={6} country='us' category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
