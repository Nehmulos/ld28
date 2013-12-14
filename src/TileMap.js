function TileMap(w,h) {
    this.w = w;
    this.h = h;
}

TileMap.prototype.setEntity = function(entity, entrance) {
    console.log("todo impl entrances");
    this.tiles[0].setEntity(entity);
}

TileMap.blank = function(w,h) {
    var t = new TileMap(w,h);
    t.initTiles(w,h);
    return t;
}

TileMap.forJsonData = function(data) {
    var t = new TileMap(data.w, data.h);
    var total = this.totalTiles();
    for (var i=0; i < total; ++i) {
        this.tiles.push(Tile.forJsonData(this, data.tiles[i]));
    }
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

TileMap.prototype.serialize = function() {
    return {
        w: this.w,
        h: this.h,
        tiles: this.tiles.map(function(t) {
            return t.serialize();
        })
    }
}
