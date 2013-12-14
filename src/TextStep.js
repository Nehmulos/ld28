function TextStep(steps, delay) {
    if (steps instanceof Array) {
        this.steps = steps;
    } else if (typeof steps === "string") {
        this.steps = [steps];
    }
    this.delay = typeof delay == "number" ? delay : 0;
}

TextStep.prototype.text = function() {
    return this.steps.join(" ");
}
