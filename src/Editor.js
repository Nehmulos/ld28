function Editor(miniMap) {
    var self = this;
    this.miniMap = miniMap;
    
    for (var i=0; i < miniMap.tiles.length; ++i) {
        (function() {
            var index = i;
            $(miniMap.tiles[i]).click(function(event) {
                self.setEditTile(event.target, index);
            });
        })();
    }
    
    $("#minimap").addClass("edit");
     
    $("#editTile button").click(function() {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", self.genCode);
    });
}

Editor.prototype.setEditTile = function(tileEl, index) {
    console.log("edit tile", tileEl, this.miniMap.tileMap.tiles[index].getPos());
}
