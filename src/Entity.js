function Entity() {
    this.icon = "e";
}

Entity.prototype.move = function(direction) {
    var nextTile = this.tile.inDirection(direction);
    if (nextTile) {
        nextTile.setEntity(this);
    }
}

