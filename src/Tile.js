function Tile(tileMap, type) {
    this.tileMap = tileMap;
    this.entity = null;
    this.type = type;
    
    this.onEnter = null;
    this.onLeave = null;
    this.onTalkOn = null;
    this.onTalkTo = null;
    this.onSearch = null;
}

Tile.prototype.icon = function() {
    if (this.entity && this.entity.icon) {
        return this.entity.icon;
    }
    switch(this.type) {
        case "floor": return ".";
        case "wall":
        case "wallV": return "|";
        case "wallH": return "-";
        case "pit": return "v";
        default: return "x";
    }
}

Tile.prototype.setEntity = function(entity) {
    if (!this.entity) {
        this.entity = entity;
        entity.tile = this;
        return true;
    } else {
        console.log("tile already used by other entity");
        return false;
    }
}

Tile.prototype.serialize = function() {
    var obj = {};
    Serialize(obj, "type", type);
    Serialize(obj, "onEnter", this.onEnter);
    Serialize(obj, "onLeave", this.onLeave);
    Serialize(obj, "onTalkOn", this.onTalkOn);
    Serialize(obj, "onTalkTo", this.onTalkTo);
    Serialize(obj, "onSearch", this.onSearch);
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
        case "north": return pos.y > 0 ? this.tileMap.tiles[pos.i-h] : null;
        case "east": return pos.x > 0 ? this.tileMap.tiles[pos.i-1] : null;
        case "west": return pos.x < w-1 ? this.tileMap.tiles[pos.i+1] : null;
        case "south": return pos.y < h-1 ? this.tileMap.tiles[pos.i+h] : null;
        default: console.error("invalid direction", direction);
    }
}
