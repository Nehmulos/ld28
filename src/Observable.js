function Observable() {
    this.observers = {};
}

Observable.inherit(Object, {
    
    addObserver: function(eventType, observer) {
        if (!this.observers[eventType]) {
            this.observers[eventType] = new Array();
        }
        
        this.observers[eventType].push(observer);
        return new ObserverBinding(this, eventType, observer);
    },
    
    removeObserver: function(eventType, observer) {
        var found = false;;
        if (this.observers[eventType]) {
            for (var i=0; i < this.observers[eventType].length; ++i) {
                if (this.observers[eventType]) {
                    this.observers[eventType].splice(0, 1);
                    found = true;
                }
            }
        }
        return found;
    },
    
    fireEvent: function(eventType, event) {
        if (this.observers[eventType]) {
            event = event || {};
            event.context = this;
            for (var i=0; i < this.observers[eventType].length; ++i) {
                this.observers[eventType][i](event);
            }
        }
    }
});

function ObserverBinding(observed, type, observer) {
    this.observed = observed;
    this.observer = observer;
    this.type = type;
}

ObserverBinding.prototype.remove = function() {
    return this.observed.remove(this.type, this.observer);
}
