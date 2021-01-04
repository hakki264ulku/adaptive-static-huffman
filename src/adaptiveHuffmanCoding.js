// If isNyt=false & char="" and have left and right children then it's an internal node
class HuffmanNode {
    constructor(weight = 0, char = "", isNYT = false, parent = {}) {
        this.weight = weight
        this.parent = parent
        this.left = this.right = {}
        this.char = char
        this.isNYT = isNYT
    }
}

// this will return the current NYT
function findNYT(root, str) {
    if (!root) return [null, str]
    if (Object.keys(root).length === 0) return [null, str]
    if (root.isNYT) {
        return [root, str]
    } else {
        if (!findNYT(root.left, str)[0]) return findNYT(root.right, str + "1")
        else if (!findNYT(root.right, str)[0]) return findNYT(root.left, str + "0")
    }
    return [null, str]
}

function convertANumtoBinaryRepresantation(num, e) { // e -> the return represantation will be in e bits
    let p = 0;
    let result = ""
    let count = 1
    while (true) {
        if (e - count === -1) {
            break
        }
        if (Math.pow(2, e - count) <= num) {
            result += "1"
            num -= Math.pow(2, e - count)
            count++
        } else {
            result += "0"
            count++
        }
    }
    return result
}

function findAllLeafs(root, leafArr = []) {
    if (Object.keys(root.left).length === 0 && Object.keys(root.right).length === 0) {
        leafArr.push(root)
        return [root, leafArr]
    } else if (!root) return

    findAllLeafs(root.left, leafArr)
    findAllLeafs(root.right, leafArr)

    return leafArr
}

function updateTreeWeights2(root, treeArray) {
    let allLeafs = findAllLeafs(root, [])

    for (const leaff of allLeafs) {
        let leaf = leaff

        while (Object.keys(leaf.parent).length !== 0) {
            leaf.parent.weight = leaf.parent.right.weight + leaf.parent.left.weight
            checkForConflictingAndSwap(treeArray)

            if (leaf.parent.left > leaf.parent.right) {
                let temp = leaf.parent.left
                leaf.parent.left = leaf.parent.right
                leaf.parent.right = temp
            }
            leaf = leaf.parent
        }
    }
}

function findTheEncounteredNodeAndIncrementWeight(c, root, flag, strCode) {
    if (Object.keys(root).length === 0 || root.isNYT) return [null, strCode]

    if (root && root.char !== "" && root.char === c) {
        if (!flag.bol) {
            root.weight++
            flag.bol = true
            return [root, strCode]
        }

        return [root, strCode]
    } else {
        if (!findTheEncounteredNodeAndIncrementWeight(c, root.left, flag, strCode)[0]) return findTheEncounteredNodeAndIncrementWeight(c, root.right, flag, strCode + "1")
        else if (!findTheEncounteredNodeAndIncrementWeight(c, root.right, flag, strCode)[0]) return findTheEncounteredNodeAndIncrementWeight(c, root.left, flag, strCode + "0")
    }
    return [null, strCode]
}

// will return the level of the node by calculating its length up to the root
function calculateLevelOfANode(node) {
    let count = 0;
    if (Object.keys(node.parent).length === 0) {
        return 0
    }

    while (Object.keys(node.parent).length !== 0) {
        count++
        node = node.parent
    }
    return count
}

function checkForConflictingAndSwap(arr) {
    // zeroth indexed item is the root so no need to swap or check
    for (let i = 1; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            // swap condition
            if (arr[i].weight < arr[j].weight) { 
                let bol = swapTwoNodes(arr[i], arr[j])
                if (bol) {
                    let temp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = temp
                }
            }
        }
    }
    return false
}

// their parent and parent's corresponding child nodes will be swapped
function swapTwoNodes(a, b) {
    let parentA = a.parent
    let parentB = b.parent

    if(Object.is(a.parent, b.parent)){
        let temp = a.parent.left
        a.parent.left = a.parent.right
        a.parent.right = temp
        return true
    }

    if(Object.is(a.parent, b) || Object.is(b.parent, a)) return false

    if(Object.is(a, a.parent.left)) a.parent.left = b
    else a.parent.right  = b

    if(Object.is(b, b.parent.left)) b.parent.left = a
    else b.parent.right = a

    b.parent = parentA
    a.parent = parentB

    return true
}

function encodeFixedCode(c, e, r) {
    // let k = letters[c]
    let k = c.charCodeAt(0)
    if (k >= 0 && k <= 2 * r) {
        return convertANumtoBinaryRepresantation(k - 1, e + 1)
    } else {
        return convertANumtoBinaryRepresantation(k - r - 1, e)
    }
}

// This will return the tree's root
function produceTree(InputStr) {
    let root = new HuffmanNode(0, "", true, {}) // initialize tree with NYT
    let encounteredChars = []
    let treeArray = [root] // will contain the nodes
    let encodedText = ""
    let e = 6, r = 63 // these depends on the number of chars in the alphabet

    for (let c of InputStr) {
        if (root.isNYT) { // means no input has added to the tree
            encodedText += findNYT(root, "")[1]

            root.left = new HuffmanNode(0, "", true, root) // this is a new NYT
            root.right = new HuffmanNode(1, c, false, root)
            root.isNYT = false

            encodedText += encodeFixedCode(c, e, r)

            root.weight = 1

            encounteredChars = encounteredChars.concat(c)
            treeArray.push(root.right)
            treeArray.push(root.left)
            continue
        } else {

            if (encounteredChars.includes(c)) {
                let strCode = findTheEncounteredNodeAndIncrementWeight(c, root, { bol: false }, "")[1]
                encodedText += strCode

                checkForConflictingAndSwap(treeArray)

                updateTreeWeights2(root, treeArray)
                continue
            } else {
                let nyt = findNYT(root, "")[0]
                encodedText += findNYT(root, "")[1]
                encodedText += encodeFixedCode(c, e, r)

                nyt.left = new HuffmanNode(0, "", true, nyt) // this is new NYT
                nyt.right = new HuffmanNode(1, c, false, nyt)
                nyt.isNYT = false

                nyt.char = ""
                nyt.weight = 1
                encounteredChars = encounteredChars.concat(c)
                treeArray.push(nyt.right)
                treeArray.push(nyt.left)

                updateTreeWeights2(root, treeArray)
                checkForConflictingAndSwap(treeArray)
                continue
            }
        }
    }
    return [root, encodedText]
}

function convertBinaryToDecimal(binary) {
    return parseInt(binary, 2)
}

function decode(encodedText) {
    let slice = ""
    let result = ""
    let e = 6, r = 63
    let root = produceTree(result)[0]

    for (let i = 0; i < e; i++) {
        slice += encodedText[i]
    }
    encodedText = encodedText.slice(e)

    if (convertBinaryToDecimal(slice) < r) {
        slice += encodedText[0]
        encodedText = encodedText.slice(1)
        let decodedNum = convertBinaryToDecimal(slice) + 1
        result += String.fromCharCode(decodedNum)
        // result += getKeyByValue(letters, decodedNum)
    }
    root = produceTree(result)[0]

    let checker = root
    let read = ""

    while (true) {
        if (encodedText.length === 0) break

        read += encodedText[0]

        if (encodedText[0] === "0") checker = checker.left
        else checker = checker.right

        encodedText = encodedText.slice(1)
        if (checker.isNYT) {
            read = ""
            for (let i = 0; i < e; i++) {
                read += encodedText[i]
            }
            encodedText = encodedText.slice(e)

            if (convertBinaryToDecimal(read) < r) {
                read += encodedText[0] // read one more bit
                encodedText = encodedText.slice(1)
                //result += getKeyByValue(letters, convertBinaryToDecimal(read) + 1)
                result += String.fromCharCode(convertBinaryToDecimal(read) + 1)
                root = produceTree(result)[0]
                checker = root
                read = ""

                continue
            } else { //convert e bits to decimal value of e bits + r + 1
                result += String.fromCharCode(convertBinaryToDecimal(read) + r + 1)

                root = produceTree(result)[0]
                checker = root
                read = ""
                continue
            }

        } else if (checker.char === "") {// If it's internal node
            continue
        } else {
            result += checker.char
            root = produceTree(result)[0]
            checker = root
            read = ""
            continue
        }
    }

    return result
}

class TreeNode {
    constructor(name, data, left, right, isNYT = false) {
        this.name = name
        this.attributes = { data }
        if (isNYT) {
            this.name = "NYT"
            this.nodeSvgShape = {
                shape: "rect", shapeProps: {
                    width: 20,
                    height: 20,
                    x: -10,
                    y: -10,
                },
            }
        }
        if (Object.keys(left).length === 0 && Object.keys(right).length !== 0) {
            this.children = [right]
        } else if (Object.keys(right).length === 0 && Object.keys(left).length !== 0) {
            this.children = [left]
        } else if (Object.keys(right).length !== 0 && Object.keys(left).length !== 0) {
            this.children = [left, right]
        }
    }
}

function recursiveCall(TreeRoot) {
    if (Object.keys(TreeRoot).length === 0) {
        return {}
    }
    let bol = false
    if (TreeRoot.isNYT) bol = true

    return new TreeNode(TreeRoot.char, TreeRoot.weight, recursiveCall(TreeRoot.left), recursiveCall(TreeRoot.right), bol)
}

function produceTreeVisualization(treeData = [], root) {
    treeData.push(recursiveCall(root))
    return treeData
}

export {
    produceTree,
    produceTreeVisualization,
    decode
}