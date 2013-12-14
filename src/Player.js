function Player() {
    this.entity = new Entity();
    this.entity.icon = "@";
    var self = this;
    
    $(window).on("keyup", function(event) {
        if (event.keyCode == Input.instance.keyNamesToKeyCodes["w"]) {
            self.entity.move("north");
        } else if (event.keyCode == Input.instance.keyNamesToKeyCodes["a"]) {
            self.entity.move("west");
        } else if (event.keyCode == Input.instance.keyNamesToKeyCodes["s"]) {
            self.entity.move("south");
        } else if (event.keyCode == Input.instance.keyNamesToKeyCodes["d"]) {
            self.entity.move("east");
        }
    });
}
