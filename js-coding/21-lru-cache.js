/*
    Least Recently Used (LRU) Cache 
        Doubly linked list to track least recently used and most recently used 
        least recently used at end, removed when needed 
        most recently used or new one at the front 
        Map 
            stores keys in order of insertion 
            so you can use keys() to remove at begining (lru) 
            adding will always be at end (mru)
            if less time is given, use keys() instead of doubly linked list 
*/
class Node {
  constructor(key, val) {
    this.key = key;
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}
class LRU {
  constructor(capacity, debug = false) {
    if (capacity <= 0) {
      throw new Error("Invalid capacity");
    }
    this.capacity = capacity;
    this.debug = debug;
    // stores key -> node
    this.cache = new Map();
    // dummy head, head.next -> MRU item
    this.head = new Node(null, null);
    // dummy tail, tail.prev -> LRU item
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  // remove node from the Doubly list
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  // add right after head (most recently used)
  addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
  // remove node at the end (least recently used)
  removeLRU() {
    const lruNode = this.tail.prev;
    if (this.debug) {
      console.log("Removing least recently used:", lruNode.key);
    }
    this.removeNode(lruNode);
    return lruNode;
  }
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const node = this.cache.get(key);
    if (this.debug) {
      console.log(`Retrieving ${key}: ${node.value}`);
    }
    this.removeNode(node);
    this.addToFront(node);
    this.printDoublyListandCache();
    return node.value;
  }
  // most recently used item
  put(key, val) {
    if (this.cache.has(key)) {
      // get node and update it's value
      const node = this.cache.get(key);
      node.value = val;
      if (this.debug) {
        console.log(`Updating ${key}: ${val}`);
      }
      // remove node from it's current position
      this.removeNode(node);
      // move node to the front since it is most recently used
      this.addToFront(node);
      this.printDoublyListandCache();
      return;
    }
    if (this.cache.size >= this.capacity) {
      const lruNode = this.removeLRU();
      // remove lru from cache
      this.cache.delete(lruNode.key);
    }
    if (this.debug) {
      console.log(`Adding ${key}: ${val}`);
    }
    const newNode = new Node(key, val);
    this.addToFront(newNode);
    this.cache.set(key, newNode);
    this.printDoublyListandCache();
  }
  printDoublyListandCache() {
    if (!this.debug) {
      return;
    }
    let current = this.head.next;
    const items = [];
    while (current !== this.tail) {
      items.push(`${current.key}=${current.value}`);
      current = current.next;
    }
    console.log(`Doubly list (MRU to LRU): \n${items.join(" -> ")}`);
    console.log("Cache: {");
    for (const [key, val] of this.cache) {
      console.log(`   ${key}:${JSON.stringify(val.value)}`);
    }
    console.log("}");
  }
}
// const lruCache = new LRU(3);
// lruCache.put(1, "one");
// lruCache.put(2, "two");
// lruCache.put(3, "three");
// lruCache.put(4, "four");
// lruCache.put(3, "THREE");
// lruCache.get(4);
class TypeAheadCache {
  constructor(capacity) {
    this.cache = new LRU(capacity);
  }
  async search(query, fetchResults) {
    if (!query || query.trim() === "") {
      return [];
    }
    const cachedResults = this.cache.get(query);
    if (cachedResults !== -1) {
      console.log("Cache hit for", query);
      return cachedResults;
    }
    const results = await fetchResults(query);
    this.cache.put(query, results);
    return results;
  }
  clearCache() {
    this.cache = new LRU(this.cache.capacity);
  }
}
function fetchResults(query) {
  console.log(`Fetching for ${query}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`Result for ${query}`]);
    }, 500);
  });
}
// (async () => {
//   const typeAhead = new TypeAheadCache(2);
//   console.log("fetch result:", await typeAhead.search("apple", fetchResults));
//   console.log("fetch result:", await typeAhead.search("banana", fetchResults));
//   console.log("fetch result:", await typeAhead.search("apple", fetchResults));
// })();
