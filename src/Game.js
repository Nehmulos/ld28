function Game() {
    this.stepQuery = [];
    this.maxDelay = 2000;
}

Game.prototype.init = function() {
    Resources.instance.load();
    this.player = new Player();
    this.miniMap = new MiniMap();
    this.setMap(TileMap.blank(10,10));
    this.editMode();
};

Game.prototype.addTextStep = function(step) {
    this.stepQuery.push(step);
    this.executeNext();
}

Game.prototype.executeNext = function() {
    if (this.waitingForDelay) {
        return;
    }
    if (this.stepQuery.length) {
        var step = this.stepQuery.splice(0,1)[0];
        step.execute();
        if (this.stepQuery.length) {
            this.executeNext();
        }
    }
}

Game.prototype.setMap = function(tileMap, entrance) {
    this.tileMap = tileMap;
    this.tileMap.setEntity(this.player.entity, entrance);
    this.miniMap.reset(this.tileMap);
}

Game.prototype.editMode = function() {
    this.editor = new Editor(this.miniMap);
}

Game.prototype.waitForDelay = function(delay) {
    if (delay > 0) {
        delay = Math.max(delay, this.maxDelay);
        this.waitingForDelay = true;
        var self = this;
        window.setTimeout(function() {
            self.waitingForDelay = false;
        }, delay);
    }
}


Game.instance = new Game();
Game.instance.init();
