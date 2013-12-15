function TileMap(w,h) {
    this.w = w;
    this.h = h;
    this.entrances = {};
    this.tiles = [];
}

TileMap.prototype.setEntity = function(entity, entrance) {
    if (this.entrances[entrance]) {
        this.at(this.entrances[entrance]).setEntity(entity);
        return;
    }
    console.error("no entrances", entrance);
    this.tiles[0].setEntity(entity);
}

TileMap.blank = function(w,h) {
    var t = new TileMap(w,h);
    t.initTiles(w,h);
    return t;
}

TileMap.forJsonData = function(data) {
    var t = new TileMap(data.w, data.h);
    t.name = data.name;
    var total = t.totalTiles();
    
    for (var i=0; i < total; ++i) {
        t.tiles.push(Tile.forChar(t, data.tileString[i]));
    }
    
    t.entrances = data.entrances
    for (var key in data.exits) {
        (function() {
            var exit = data.exits[key];
            var entrance = key;
            t.at(exit.pos).addObserver("onEnter", function(event) {
                Game.instance.setMap(
                    TileMap.forJsonData(window[exit.map]),
                    entrance
                );
            });
        })();
    }
    
    for (var i=0; i < data.scripts.length; ++i) {
        var script = data.scripts[i];
        for (var key in script) {
            if (key == "pos") {
                continue;
            }
            if (key == "args") {
                for (var k in script.args) {
                    t.at(script.pos)[k] = script.args[k];
                }
                continue;
            }
            t.at(script.pos).addObserver(key, script[key]);
        }
    }
    
    return t;
}

TileMap.prototype.initTiles = function(w,h) {
    this.tiles = [];
    this.w = w;
    this.h = h;
    var total = this.totalTiles();
    for (var i=0; i < total; ++i) {
        this.tiles.push(new Tile(this, "asdf"));
    }
}

TileMap.prototype.totalTiles = function() {
    return this.w * this.h;
}

TileMap.prototype.at = function(pos) {
    if (typeof pos == "number") {
        return this.tiles[pos];
    } else if (pos instanceof Array) {
        return this.tiles[pos[0] + (pos[1]*this.w)];
    } else if (typeof pos == "object" && pos) {
        return this.tiles[pos.x + (pos.y*this.w)];
    } else {
        console.error("invalid tile position", pos);
    }
    return null;
}


TileMap.prototype.serialize = function() {
    return {
        w: this.w,
        h: this.h,
        tiles: this.tiles.map(function(t) {
            return t.serialize();
        })
    }
}
