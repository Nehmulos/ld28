function MiniMap() {
    var self = this;
    $(window).resize(function() {
        self.resize();
    })
}

MiniMap.prototype.reset = function(tileMap) {
    var mm = $("#minimap");
    mm.empty();
    this.tileMap = tileMap;
    this.tiles = [];
    var total = tileMap.totalTiles();
    
    this.iconW = Math.floor(mm.width() / tileMap.w);
    this.iconH = Math.floor(mm.height() / (tileMap.h));

    this.iconH = this.iconW = Math.min(this.iconW, this.iconH)

    var self = this;
    for (var y=0; y < tileMap.h; ++y) {    
        for (var x=0; x < tileMap.w; ++x) {
            var i = (y*tileMap.w) + x;
            var icon = this.createTileIcon(tileMap.tiles[i].icon());
            var el = document.createElement("div");
            if (x == 0) {
                el.className = "first tile";
            } else {
                el.className = "tile";
            }
            el.style.width = this.iconW + "px";
            el.style.height = this.iconH + "px";
            $(el).append(icon);
            mm.append(el);
            this.tiles.push(el);
            
            // TODO remove observers
            (function() {
                var iSafe = i;
                tileMap.tiles[i].addObserver("iconChange", function(event) {
                    var ic = self.createTileIcon(tileMap.tiles[iSafe].icon());
                    $(self.tiles[iSafe]).empty();
                    $(self.tiles[iSafe]).append(ic);
                });
            })();
        }
    }
}

MiniMap.prototype.resize = function() {
    var mm = $("#minimap");
    this.iconW = Math.floor(mm.width() / this.tileMap.w);
    this.iconH = Math.floor(mm.height() / this.tileMap.h);

    this.iconH = this.iconW = Math.min(this.iconW, this.iconH);
    
    for (var i=0; i < this.tiles.length; ++i) {
        var el = this.tiles[i];
        el.style.width = this.iconW + "px";
        el.style.height = this.iconH + "px";
    }
}

MiniMap.prototype.createTileIcon = function(icon) {
    if (typeof icon == "string") {
        return icon;
    } else if (icon && icon.img) {
        var el = new Image();
        el.width = this.iconW;
        el.height = this.iconH;
        el.src = icon.img;
        return el;
    }
    console.error("unknown icon type", icon);
}

MiniMap.prototype.render = function() {

}
