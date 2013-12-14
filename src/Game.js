function Game() {
    this.stepQuery = [];
    this.maxDelay = 2000;
    this.charDelay = 40;
    Observable.prototype.constructor.call(this);
}

Game.prototype = new Observable();
Game.prototype.constructor = Game;

Game.prototype.init = function() {
    Resources.instance.load();
    this.player = new Player();
    this.miniMap = new MiniMap();
    this.setMap(TileMap.forJsonData(MapStart), "init");
    this.editMode();
    this.addTextStep(new TextStep("", 500));
    this.addTextStep(new TextStep("Fugg u punk"));
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
        this.execute(step);
        if (this.stepQuery.length) {
            this.executeNext();
        }
    }
}

Game.prototype.execute = function(step) {
    var gt = $("#gameText");
    gt.empty();
    var text = step.text();
    this.animateAppend(gt, text);
    if (step.delay) {
        this.waitForDelay(step.delay);
    }
}

Game.prototype.animateAppend = function(gt, text) {
    if (!text) {
        return;
    }
    text = text.split("").map(function(t) {
        return "<span style=\"display:none;\">" + t + "</span>";
    });
    var i = 0;
    var self = this;
    var interval = window.setInterval(function() {
        var char = $(text[i]);
        gt.append(char);
        char.fadeIn();
        ++i;
        if (i >= text.length) {
            window.clearInterval(interval);
            self.fireEvent("appendAnimationFinished");
        }
    }, this.charDelay);
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
        delay = Math.max(0, Math.min(delay, this.maxDelay));
        this.waitingForDelay = true;
        var self = this;
        window.setTimeout(function() {
            self.waitingForDelay = false;
            self.executeNext();
        }, delay);
    }
}


Game.instance = new Game();
Game.instance.init();
