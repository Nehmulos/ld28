function Entity() {
    this.icon = "e";
}

Entity.prototype.move = function(direction) {
    var nextTile = this.tile.inDirection(direction);
    if (nextTile && !nextTile.blocking) {
        nextTile.setEntity(this);
        return true;
    }
    return false;
}

Entity.prototype.isPlayer = function() {
    return this == Game.instance.player.entity;
}
