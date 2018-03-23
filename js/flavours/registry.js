const FlavourRegistry = class {
    constructor() {
        this.registrations = {};
        this.names = {};
    }
    register(id, displayNme, creator) {
        this.registrations[id] = creator;
        this.names[id] = displayNme;
    }
    keys() {
        return Object.keys(this.registrations);
    }
    displayName(id) {
        return this.names[id];
    }
    load(id) {
        this.registrations[id]();
    }
};

const flavourRegistry = new FlavourRegistry();
