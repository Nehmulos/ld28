function Entity() {
    this.icon = "e";
    this.tileHistory = {};
}

Entity.prototype.move = function(direction) {
    var nextTile = this.tile.inDirection(direction);
    if (nextTile && nextTile.canMoveHere(this)) {
        nextTile.setEntity(this);
        if (nextTile.track) {
            this.tileHistory[nextTile.getId()] = true;
        }
        return true;
    }
    return false;
}

Entity.prototype.isPlayer = function() {
    return this == Game.instance.player.entity;
}

Entity.prototype.visitedTile = function(tile) {
    return this.tileHistory[tile.getId()];
}
