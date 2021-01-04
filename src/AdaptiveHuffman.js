import './App.css';
import { useEffect, useState } from "react"
import Tree from 'react-d3-tree';
import tw from "twin.macro"
import { produceTree, produceTreeVisualization, decode } from './adaptiveHuffmanCoding';


function AdaptiveHuffman() {

  const [treeData, setTreeData] = useState([{ name: "empty root" }])
  const [input, setInput] = useState("")
  const [encoded, setEncoded] = useState("")
  const [decoded, setDecoded] = useState("")
  const [ratio, setRatio] = useState("")

  let produce = () => {
    let [root, enc] = produceTree(input)
    let tdata = produceTreeVisualization([], root)
    setEncoded(enc)

    let val = enc.length *1 // 1 and 0 are one bits
    setRatio((val/(input.length*8))*100) // one char is 8 bits

    setTreeData(tdata)
  }

  let decodeText = () => {
    let dcd = decode(encoded)
    setDecoded(dcd)
    console.log(dcd)
  }

  return (
    <MainContainer>
      <Container>
        <Input value={input} onChange={(e) => {
          setInput(e.target.value)
        }} />
        <Buttons>
          <Button onClick={() => produce()}>Produce Tree</Button>
          <Button2 onClick={() => decodeText()}>Decode Text</Button2>
          <Ratio>Compresion Ratio (%) ={ratio}</Ratio>
        </Buttons>
        <InfoContainer>
          
        </InfoContainer>
      </Container>

      <TextContainer>
        <EncodedText>Encoded text: <Text>{encoded}</Text></EncodedText>
        <EncodedText>Decoded text: <Text>{decoded}</Text></EncodedText>
      </TextContainer>


      <TreeContainer>
        <Tree data={treeData}
          height={400}
          width={400}
          orientation="vertical"
          translate={{ x: 950, y: 140 }} />


      </TreeContainer>


    </MainContainer>
  );
}

const MainContainer = tw.div`h-screen w-screen bg-blue-100 font-sans`
const Container = tw.div`flex items-start justify-around`

const Buttons = tw.div`flex flex-col items-start`
const Ratio = tw.div`font-bold mt-4`

const Button = tw.button`px-4 py-3 border-none hover:cursor-pointer focus:outline-none
rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold`

const Button2 = tw.button`px-4 py-3 border-none hover:cursor-pointer focus:outline-none
rounded-xl bg-green-400 hover:bg-green-500 text-white font-bold mt-8`

const InfoContainer = tw.div`flex flex-col rounded overflow-auto max-h-64 h-64`
const Input = tw.textarea`overflow-auto w-1/4 h-64 max-w-lg`

const TreeContainer = tw.div`bg-green-200 mt-4 h-full w-screen`

const TextContainer = tw.div`w-screen `
const EncodedText = tw.div`ml-4 pt-8 font-bold p-2 w-4/5`
const Text = tw.div`text-gray-900 font-light overflow-auto`

export default AdaptiveHuffman;
