function TextStep(steps) {
    if (steps instanceof Array) {
        this.steps = steps;
    } else if (typeof steps === "string") {
        this.steps = [steps];
    }
}
