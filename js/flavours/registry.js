const FlavourRegistry = class {
    constructor() {
        this.mRegistrations = {};
        this.mNames = {};
        this.mUrls = {};
    }
    register(id, displayNme, creator, urls = []) {
        this.mRegistrations[id] = creator;
        this.mNames[id] = displayNme;
        this.mUrls[id] = urls;
    }
    keys() {
        return Object.keys(this.mRegistrations);
    }
    has(key) {
        return this.mRegistrations[key] !== undefined;
    }
    displayName(id) {
        return this.mNames[id];
    }
    urls(id) {
        return this.mUrls[id];
    }
    load(id) {
        this.mRegistrations[id]();
    }
};

const flavourRegistry = new FlavourRegistry();
