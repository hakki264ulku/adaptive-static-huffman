import './App.css';
import { useEffect, useState } from "react"
import Tree from 'react-d3-tree';
import tw from "twin.macro"
import { produceTree, decodeText } from "./huffmanCoding"


function StaticHuffman() {
    const [input, SetInput] = useState("")
    const [treeData, setTreeData] = useState([{ name: "empty root" }])
    const [info, setInfo] = useState([])
    const [usedOnce, setUsedOnce] = useState(false)
    const [encoded, setEncoded] = useState("")
    const [decoded, setDecoded] = useState("")
    const [root, setRoot] = useState({})
    const [ratio, setRatio] = useState(0)

    useEffect(() => {
        if (input.length === 0 && usedOnce) {
            window.location.reload()
        }
    }, [input])

    function produce() {
        let [root, arr, encodedText] = produceTree(input)
        setTreeData([].concat(root))
        setInfo(arr)
        console.log(arr)
        let val = 0

        arr.forEach(i => {
            val += i.freq * i.size
        })

        setRatio((val / (input.length*8))*100)

        setRoot(root)
        setUsedOnce(true)
        setEncoded(encodedText)
    }

    function decode() {
        let str = decodeText(root, encoded)
        setDecoded(str)
    }

    let toggle = false

    return (
        <MainContainer>
            <Container>
                <Input value={input} onChange={(e) => SetInput(e.target.value)} />
                <Buttons>
                    <Button onClick={() => produce()}>produce tree</Button>
                    <Button2 onClick={() => decode()}>Decode Text</Button2>
                    <Ratio>Compresion Ratio (%) ={ratio}</Ratio>
                </Buttons>
                <InfoContainer>
                    <InfoTable>
                        <InfoRow>
                            <InfoHeader>Char</InfoHeader>
                            <InfoHeader>Frequency</InfoHeader>
                            <InfoHeader>Bit Code</InfoHeader>
                            <InfoHeader>Size(bits)</InfoHeader>
                        </InfoRow>

                        {info.map((i) => {
                            if (!toggle) {
                                toggle = true
                                return (
                                    <InfoRow1 key={i.bitCode}>
                                        <InfoData>{i.name}</InfoData>
                                        <InfoData>{i.freq}</InfoData>
                                        <InfoData>{i.bitCode}</InfoData>
                                        <InfoData>{i.size}</InfoData>
                                    </InfoRow1>
                                )
                            } else {
                                toggle = false
                                return (
                                    <InfoRow2 key={i.bitCode}>
                                        <InfoData>{i.name}</InfoData>
                                        <InfoData>{i.freq}</InfoData>
                                        <InfoData>{i.bitCode}</InfoData>
                                        <InfoData>{i.size}</InfoData>
                                    </InfoRow2>
                                )
                            }
                        }
                        )}
                    </InfoTable>

                </InfoContainer>
            </Container>

            <TextContainer>
                <EncodedText>Encoded text: <Text>{encoded}</Text></EncodedText>
                <EncodedText>Decoded text: <Text>{decoded}</Text></EncodedText>
                
            </TextContainer>

            <TreeContainer>
                <Tree
                    data={treeData}
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
const Button = tw.button`px-4 py-3 border-none hover:cursor-pointer focus:outline-none
rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold`

const Button2 = tw.button`px-4 py-3 border-none hover:cursor-pointer focus:outline-none
rounded-xl bg-green-400 hover:bg-green-500 text-white font-bold mt-8`

const Buttons = tw.div`flex flex-col items-start`
const Ratio = tw.div`font-bold mt-4`


const InfoContainer = tw.div`flex flex-col rounded overflow-auto max-h-64 h-64`
const InfoTable = tw.table`table-auto bg-gray-100 text-center`
const InfoRow = tw.tr``
const InfoRow1 = tw.tr`bg-gray-300`
const InfoRow2 = tw.tr``
const InfoHeader = tw.th`bg-gray-200 font-bold px-4 py-2`
const InfoData = tw.td``

const Input = tw.textarea`overflow-auto w-1/4 h-64 max-w-lg`

const TreeContainer = tw.div`bg-green-200 mt-4 h-full w-screen`

const TextContainer = tw.div`w-screen `
const EncodedText = tw.div`ml-4 pt-8 font-bold p-2 w-4/5 max-h-36 `
const Text = tw.div`text-gray-900 font-light overflow-auto`



export default StaticHuffman;