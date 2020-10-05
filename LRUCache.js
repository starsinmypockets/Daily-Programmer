/*	Create an LRU cache with a given capacity. An LRU cache is a key/value store 
 *	that holds a specified number of entries and evicts the least recently used 
 *	entry when the cache is at capacity and a new entry is added. "Used" in this 
 *	context means a put or get operation is performed on an entry. The cache should 
 *	implement the following operations.
 * 	put(key, value): the value is inserted into the cache at key, and if this 
 *	causes the cache to be over capacity, the least recently used element is 
 *	evicted. This new entry is now the most recently used.
 *	get(key): return the value at the given key, or -1 (or a special value of 
 *	your choice) if the key is not present in the cache. If present, the entry 
 *	at key will now be the most recently used.
 *	There are classes/libraries in many languages that make this trivial to 
 *	implement. Please implement without their use.
 */
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize
    this.cache = []
  }

  put(key, val) {
    // if key exists, update
    const match = this.cache.find(row => row.key === key)
    if (match) {
      this.cache.splice(this.cache.indexOf(match), 1)
      this.cache.push({ key: key, value: val })
    }

    // if cache is at capacity, remove oldest
    else if (this.cache.length === this.maxSize) {
      this.cache.splice(0, 1)
      this.cache.push({ key: key, value: val })
    }

    // or just push it to the stack
    else {
      this.cache.push({ key: key, value: val })
    }
  }

  get(key) {
    const match = this.cache.find(row => row.key === key)

    if (match) {
      // move to top of stack and return
      this.cache.splice(this.cache.indexOf(match), 1)
      this.cache.push(match)
      return match.value
    } else {
      return -1
    }
  }
}

module.exports.LRUCache = LRUCache
