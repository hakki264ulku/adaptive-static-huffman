# ⭐ Adaptive & Static Huffman Coidng Simulator
* Live (See the application running): https://adaptive-static-huffman-363c7.web.app/
* This project is built to simulate adaptive and static huffman coding as a project for the Design and Analysis of Algorithms course.
* To understand the project might be a bit difficult (❗) because of React related files, for the ease of understanding try to focus on AdaptiveHuffman.js, adaptiveHuffmanCoidng.js, huffmanCoding.js, StaticHuffman.js and App.js

# ❔ Idea Behind The Project
* In Static Huffman Coding there is a priority queue. For every new encountered character from the input, you need to add a new node to the priority queue. Then, extract two min nodes from the queue and create a new node which includes these two as children and its frequency is sum of these two's. Add this new node to the priority queue. And repeat above steps until there is only one node in the queue. It's the root of the tree..

* In Adaptive Huffman Coding there are three main steps. Producing the tree, encoding and decoding. For producing the tree, the inputs are taken one by one so that the tree will be produced dynamically. If the new input symbol is encountered for the first time, add that to the current NYT with a new nyt. If the new input symbol is encountered before, find that in the tree and increment its weight. Update whole tree and according to increasing rule from left to right and bottom to top swap the conflicting nodes.

# 🚀 Tech Stack
* JavaScript
* ReactJS
* TailwindCss

# 💿 How to Run Local
```
# Clone this repository
$ git clone https:https://github.com/hakki264ulku/adaptive-static-huffman.git

# Go into the repository
$ cd adaptive-static-huffman

# Install Dependencies (❗YOU NEED TO HAVE NODEJS installed on your local environment❗)
$ npm install

# Start to see the application in the localhost:3000
$ npm run start
```
