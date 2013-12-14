function Editor(miniMap) {
    var self = this;
    
    for (var i=0; i < miniMap.tiles.length; ++i) {
        (function() {
            var index = i;
            miniMap.tiles[i].onclick = function(event) {
                self.setEditTile(event.target, index);
            }
        });
    }
        
    $("#editTile button").click(function() {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", self.genCode);
    });
}

Editor.prototype.setEditTile = function(tileEl, index) {
    console.log("edit tile", tileEL, index);
}
