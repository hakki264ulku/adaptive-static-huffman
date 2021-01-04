import './App.css';
import { useEffect, useState } from "react"
import Tree from 'react-d3-tree';
import tw from "twin.macro"
import React from "react";
import NavBar from './NavBar'
import TopContainer from './TopContainer'
import StaticHuffman from "./StaticHuffman"
import AdaptiveHuffman from "./AdaptiveHuffman"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <TopContainer />
      <NavBar />
      <Switch>
        <Route exact path="/staticHuffman">
          <StaticHuffman />
        </Route>
        <Route exact path="/adaptiveHuffman">
          <AdaptiveHuffman />
        </Route>
      </Switch>
    </Router>
  );
}

const Button = tw.button`no-underline`


export default App;
