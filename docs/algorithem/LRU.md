# LRU

js 中 Map 是有序的，可以用 map 实现，或者链表

## Map

```js
class LRUCache {
  constructor(capacity) {
    this.queue = new Map();
    this.capacity = capacity;
  }

  get(key) {
    const val = this.queue.get(key);
    if (!val) return;
    this.queue.delete(key);
    this.queue.set(key, val);
    return val;
  }

  set(key, value) {
    const val = this.queue.get(key);
    if (val) {
      this.queue.delete(key);
    }
    this.queue.set(key, value);

    if (this.queue.size > this.capacity) {
      this.removeFirst();
    }
  }
  removeFirst() {
    // keys() is iterator, next() is the first one
    const firstKey = this.queue.keys().next().value;
    this.queue.delete(firstKey);
  }
  remove(key) {
    if (this.queue.has(key)) {
      this.queue.delete(key);
    }
  }
}
```
