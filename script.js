class Node {
    constructor(bit) {
      this.bit = bit; 
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null; 
    }
  
    append(bit) {
      const newNode = new Node(bit);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
  
    static fromDouble(number) {
      const linkedList = new LinkedList();
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      view.setFloat64(0, number);
  
      for (let i = 0; i < 8; i++) {
        const byte = view.getUint8(i);
        for (let j = 7; j >= 0; j--) {
          linkedList.append((byte >> j) & 1);
        }
      }
  
      return linkedList;
    }
  
    toDouble() {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      let currentNode = this.head;
  
      for (let i = 0; i < 8; i++) {
        let byte = 0;
        for (let j = 7; j >= 0; j--) {
          if (currentNode) {
            byte |= currentNode.bit << j;
            currentNode = currentNode.next;
          }
        }
        view.setUint8(i, byte);
      }
  
      return view.getFloat64(0);
    }
  
    static add(linkedListA, linkedListB) {
      const result = new LinkedList();
      let carry = 0;
  
      let nodeA = linkedListA.head;
      let nodeB = linkedListB.head;
  
      const reverseBits = (list) => {
        const bits = [];
        let current = list.head;
        while (current) {
          bits.push(current.bit);
          current = current.next;
        }
        return bits.reverse();
      };
  
      const bitsA = reverseBits(linkedListA);
      const bitsB = reverseBits(linkedListB);
  
      const maxLength = Math.max(bitsA.length, bitsB.length);
  
      for (let i = 0; i < maxLength || carry; i++) {
        const bitA = i < bitsA.length ? bitsA[i] : 0;
        const bitB = i < bitsB.length ? bitsB[i] : 0;
  
        const sum = bitA + bitB + carry;
        result.append(sum % 2);
        carry = Math.floor(sum / 2);
      }
  
      return result;
    }
  
    toBinaryString() {
      let binaryString = '';
      let currentNode = this.head;
      while (currentNode) {
        binaryString += currentNode.bit;
        currentNode = currentNode.next;
      }
      return binaryString;
    }
  }
  
  const listA = LinkedList.fromDouble(3.14);
  const listB = LinkedList.fromDouble(2.71);
  
  console.log("List A (Binary):", listA.toBinaryString());
  console.log("List B (Binary):", listB.toBinaryString());
  
  const result = LinkedList.add(listA, listB);
  console.log("Result (Binary):", result.toBinaryString());
  
  const resultDouble = result.toDouble();
  console.log("Result (Double):", resultDouble);
  