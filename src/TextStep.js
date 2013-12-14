function TextStep(arg) {
    this.string = "";
    this.delay = 0;
    this.clear = false;
    
    if (typeof arg == "string") {
        this.string = arg
    } else if (typeof arg == "number") {
        this.delay = arg;
    } else if (typeof arg == "object") {
        for (var key in arg) {
            this[key] = arg[key];
        }
    } else {
        console.warn("step with no args");
    }
}

TextStep.prototype.text = function() {
    return this.string;
}
