import './App.css';
import { useEffect, useState } from "react"
import tw from "twin.macro"
import React from "react";
import StaticHuffman from "./StaticHuffman"
import {
  Link
} from "react-router-dom";

function App() {

  const [bol, setBol] = useState(0) // if one static, if two adaptive

  return (
    <NavContainer>
      <NavButtonsContainer>
        <Link to="/staticHuffman">
          {bol === 1 && <ClickedButton>Static Huffman</ClickedButton>}
          {bol !== 1 && <NavButton onClick={() => setBol(1)}>Static Huffman</NavButton>}
        </Link>

        <Link to="/adaptiveHuffman">
          {bol === 2 && <ClickedButton>Adaptive Huffman</ClickedButton>}
          {bol !== 2 && <NavButton onClick={() => setBol(2)}>Adaptive Huffman</NavButton>}
        </Link>
      </NavButtonsContainer>
    </NavContainer>
  );
}

const NavContainer = tw.div`w-screen justify-center font-sans bg-blue-100 py-4 pb-12`
const NavButtonsContainer = tw.div` flex justify-around`
const NavButton = tw.button`py-2 px-4 font-bold text-white text-lg border-none bg-gray-400 hover:bg-gray-600 rounded-lg hover:cursor-pointer
focus:outline-none hover:shadow-xl`

const ClickedButton = tw.button`py-2 px-4 font-bold text-white text-lg border-none bg-gray-600 rounded-lg hover:cursor-pointer
focus:outline-none shadow-xl`


export default App;
