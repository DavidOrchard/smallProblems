
/*
Implement an LRU cache.


  Questions:
  sizing? Can fit in memory including objects.
  
  Design
  hashtable for items
  ll/queue for LRU
  */

 // Returns the value of the key if found, otherwise returns -1.
 // Marks item as most recently used.

 // js splice
 // splice(start, deleteCount)

 class LRUCache {
    capacity: any;
    cache: Record<string,any>;
    lru: number[];
  
    constructor(capacity:number) {
       this.capacity = capacity;
       this.cache = {};
       this.lru = [];
    }
  
   get(key:number) {
       // TODO:error checking key
       const val:Record<string,any> = this.cache[key];
       // TODO: 
       if(typeof val === "undefined") {
           return -1;
       }
       this.lru.splice(val.index, 1);
       this.lru.push(key);
       this.cache[key] = {value: val.value, index:this.lru.length -1};
       return val.value;
   }
  
   // Update the value of the key if the key exists or adds the key-value pair
   // to the cache. If the number of keys exceeds the capacity from this operation,
   // evict the least recently used key.
   // value and key are integers
   put(key:number, value:number){
       const val:Record<string,any> = this.cache[key];
       if(typeof val !== "undefined") {
           this.lru.splice(val.index, 1);
       }
  
       const index = this.lru.length;
       this.cache[key] = {value,index};
       // evict entry
       if(index === this.capacity) {
           // remove entry;
           this.lru.shift();
           delete this.cache[key];
       }
       this.lru.push(key);
       // console.log('lru', lruArray, 'cache', cache);
       
       // for LRU use an array sorted 
       // put(1,1)
       // array has [1]
       // put(2,2) will result in a push onto the array.
       // array has [1, 2]
       // get(1)
       // arrray has [2, 1]
       // O(complexity)
       // how to improve O(1)
       // use map/hash
       // keep the value in the cache.
       // double linked list.
       // TODO LRU eject and update access/times
   }
  }

  
  // test 1
  // put(1,2);
  // console.log(get(1));
  
  // test 2
  const cache = new LRUCache(2);
  cache.put (1, 1);
  cache.put ( 2, 2);
  // evict 1
  cache.put ( 3, 3);
  console.log(cache.get(1))// should be -1 
  
  console.log(cache.get(2))// should be 2 
  console.log(cache.get(3))// should be 3
  