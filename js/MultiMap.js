class MultiMap {
    constructor() {
        this.map = new Map();
    }
    ensureInit(key) {
        if (!this.map.has(key)) {
            this.map.set(key, [])
        }
    }
    get(key) {
        this.ensureInit(key);
        return this.map.get(key);
    }
    push(key, object) {
        this.ensureInit(key);
        return this.get(key).push(object);
    }
    keys() {
        return this.map.keys();
    }
    entries() {
        return this.map.entries();
    }
}
