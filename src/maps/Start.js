MapStart = {
    w: 10,
    h: 7,
    tileString: 
        "          " +
        "  ——————  " +
        "  |    |  " +
        "  |    +  " +
        "  |    |  " +
        "  ——————  " +
        "          ",
        
    entrances: {
        init: 34,
        doorStart: 55
    },
    
    exits: {
        doorStart: {i: 37, map: "Map2"}
    },
    
    scripts: [
        {
            i: 35,
            onEnter: function(event) {
                if (event.entity.isPlayer()) {
                    console.log(
                        "player entered tile",
                        event.context.removeObserver("onEnter", this)
                    );
                }
            }
        }
    ]
    
}
