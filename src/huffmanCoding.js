import PriorityQueue from "js-priority-queue"

class HuffmanNode {
    constructor(data, c, left, right) {
        this.data = data
        this.c = c
        this.children = [left, right]
        this.left = left
        this.right = right
    }
}

class TreeNode {
    constructor(name, data, left, right) {
        this.name = name
        this.attributes = { data }
        if (Object.keys(left).length === 0 && Object.keys(right).length !== 0) {
            this.children = [right]
        } else if (Object.keys(right).length === 0 && Object.keys(left).length !== 0) {
            this.children = [left]
        } else if (Object.keys(right).length !== 0 && Object.keys(left).length !== 0) {
            this.children = [left, right]
        }
    }
}

// recursive print function to print the chars and their frequencies
let arr=[]
let encodedLetters = {}
function printCode(root, s) {

    if (!root.children) {
        arr = arr.concat({name:root.name, freq:root.attributes.data, bitCode:s, size: s.length})
        encodedLetters[root.name] = s
        return
    }

    // for going left: add 0 to the code
    // for going right: add 1 to the code
    printCode(root.children[0], s + "0")
    printCode(root.children[1], s + "1")
}

let encodedText=""
function encodeTheCode(InputStr) {
    for (const c of InputStr) {
        encodedText = `${encodedText}${encodedLetters[c]}`
    }
}

function decodeText(root, EncodedText) {
    let decoded = ""

    let curr = root
    for (let i = 0; i < EncodedText.length; i++) {
        if(EncodedText[i] === "0") curr = curr.children[0]
        else curr = curr.children[1]

        if(!Object.keys(curr).includes("children")){
            decoded += curr.name
            curr = root
        }
    }
    return decoded
}

// Returns a map(key:value) -> char:occurence
function getCountsOfChars(input) {
    let counts = {};

    let ch, i, len, count;

    // Loop through the string...
    for (i = 0, len = input.length; i < len; ++i) {
        ch = input.charAt(i);

        count = counts[ch];

        counts[ch] = count ? count + 1 : 1;
    }

    return counts

}

function getCharArrayAndCharFrequency(input) {
    let mapCounts = getCountsOfChars(input)

    let chars = Object.keys(mapCounts)
    let frequencies = Object.values(mapCounts)

    return [chars, frequencies]
}

const compareNodes = function (n1, n2) {
    return n1.attributes.data - n2.attributes.data
}

function produceTree(str) {

    let [charArray, charFreq] = getCharArrayAndCharFrequency(str)

    let queue = new PriorityQueue({ comparator: compareNodes })
    
    for (let i = 0; i < charArray.length; i++) {
        let tn = new TreeNode(charArray[i], charFreq[i], {}, {})
        queue.queue(tn)
    }

    let root = null

    while (queue.length > 1) {
        let min1 = queue.dequeue()
        let min2 = queue.dequeue()

        let newNode = new TreeNode('-', min1.attributes.data + min2.attributes.data, min1, min2)

        root = newNode

        queue.queue(newNode)
    }

    printCode(root, "") //encodes by using the tree's
    encodeTheCode(str) // produces the encoded text by using the encoded letters
    decodeText(root, encodedText)
    
    return [root, arr, encodedText]
}

export {
    produceTree,
    decodeText
}