import './App.css';
import tw from 'twin.macro'

function TopContainer() {

  return (
    <MainContainer>

      <ProfileContainer>
        <Image src='ppp.jpeg' />
        <InfoAboutDeveloperContainer>
          <Title>Hakkı ÜLKÜ</Title>
          <No>172010020024</No>
          <Explanation>
            Design and Analysis of Algorithms
          </Explanation>
          <Explanation>Programming Project 1</Explanation>
        </InfoAboutDeveloperContainer>
      </ProfileContainer>



      <ApplicationExplanationContainer>
        <ApplicationTitle>Adaptive & Static Huffman Coding</ApplicationTitle>
        <AppExplanation>
          This application built to simulate Adaptive & Static huffman coding.
        </AppExplanation>
        <AppExplanation></AppExplanation>
        <ExplanationContainer>
          <AppExplanation>
            <Bold> In Static Huffman Coding</Bold> there is a priority queue.
            For every new encountered character from the input, you need to add a new node to the priority queue.
            Then, extract two min nodes from the queue and create a new node which includes these two as children and its frequency is sum of these two's.
            Add this new node to the priority queue. And repeat above steps until there is only one node in the queue. It's the root of the tree..
        </AppExplanation>

          <AppExplanation>
            <Bold>In Adaptive Huffman Coding</Bold> there are three main steps. Producing the tree, encoding and decoding.
            For producing the tree, the inputs are taken one by one so that the tree will be produced dynamically.
            If the new input symbol is encountered for the first time, add that to the current NYT with a new nyt.
            If the new input symbol is encountered before, find that in the tree and increment its weight.
            Update whole tree and according to increasing rule from left to right and bottom to top swap the conflicting nodes.
        </AppExplanation>
        </ExplanationContainer>
      </ApplicationExplanationContainer>

    </MainContainer>

  );
}

export default TopContainer;


// Styled ~ Components //

const MainContainer = tw.div`flex justify-around mb-4`

const ProfileContainer = tw.div`w-2/5 bg-blue-100 shadow-xl rounded-lg p-4
flex items-start`
const Image = tw.img`rounded-full w-32 md:w-64`
const InfoAboutDeveloperContainer = tw.div`ml-16`
const Title = tw.h2`font-bold text-gray-900 text-5xl mt-4`
const No = tw.h3`font-bold text-xl text-gray-600 mt-1 mb-4`
const Explanation = tw.p`font-bold text-blue-800 text-2xl`
const ExplanationContainer = tw.div`flex items-start`

const Bold = tw.p`font-bold text-lg text-blue-900`

const ApplicationExplanationContainer = tw.div`w-2/5 bg-blue-100 shadow-xl rounded-lg p-4`
const ApplicationTitle = tw.h2`font-bold text-gray-900 text-4xl text-center mb-1`
const AppExplanation = tw.div`font-bold text-blue-800 text-base ml-4 mb-1`
