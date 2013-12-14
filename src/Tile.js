function Tile(tileMap, type) {
    this.tileMap = tileMap;
    this.entity = null;
    this.type = type;
    this.blocking = false;
    
    Observable.prototype.constructor.call(this);
}

Tile.prototype = new Observable();
Tile.prototype.constructor = Tile;

Tile.forChar = function(tileMap, c) {
    var type = null;
    for (var key in Tile.typeToChar) {
        if (Tile.typeToChar[key] == c) {
            type = key;
            break;
        }
    }
    var t = new Tile(tileMap, type);
    return t;
}

Tile.typeToChar = {
    "floor": ".",
    "wallV": "|",
    "wallH": "—",
    "wall": "|",
    "door": "+",
    "pit": "v",
}

Tile.prototype.icon = function() {
    if (this.entity && this.entity.icon) {
        return this.entity.icon;
    }
    return Tile.typeToChar[this.type] || "";
}

Tile.prototype.setEntity = function(entity) {
    if (!this.entity) {
        var oldTile = entity.tile;
        
        this.entity = entity;
        entity.tile = this;
        
        if (oldTile) {
            oldTile.entity = null;
            oldTile.fireEvent("iconChange");
            oldTile.fireEvent("onLeave", {entity: entity});
        }
        this.fireEvent("iconChange");
        this.fireEvent("onEnter", {entity: entity});
        return true;
    } else {
        console.log("tile already used by other entity");
        return false;
    }
}

Tile.prototype.serialize = function() {
    var obj = {};
    Serialize(obj, "type", this.type);
    Serialize(obj, "blocking", this.blocking);
    return obj;
}

Tile.prototype.getPos = function() {
    for (var y=0; y < this.tileMap.h; ++y) {    
        for (var x=0; x < this.tileMap.w; ++x) {
            var i = (y*this.tileMap.w) + x;
            if (this.tileMap.tiles[i] == this) {
                return {x:x, y:y, i:i};
            }
        }
    }
}


Tile.prototype.inDirection = function(direction) {
    var pos = this.getPos();
    var w = this.tileMap.w;
    var h = this.tileMap.h;
    switch (direction) {
        case "north": return pos.y > 0 ? this.tileMap.tiles[pos.i-w] : null;
        case "east": return pos.x < w-1 ? this.tileMap.tiles[pos.i+1] : null;
        case "west": return pos.x > 0 ? this.tileMap.tiles[pos.i-1] : null;
        case "south": return pos.y < h-1 ? this.tileMap.tiles[pos.i+w] : null;
        default: console.error("invalid direction", direction);
    }
}
