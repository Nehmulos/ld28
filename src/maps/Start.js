var MapStart = {
    name: "MapStart",
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
        doorStart: [6,3]
    },
    
    exits: {
        doorStart: {pos: [7,3], map: "Map2"}
    },
    
    scripts: [
        //doorStart
        {
            pos: [7,3],
            args: { open:false },
        },
        // trip
        {
            pos: [5,3],
            args: {track: true },
            onFirstEnter: function(event) {
                if (event.entity.isPlayer()) {
                    Game.instance.add(new TextStep("You slip on the wet ground and hit your head."));
                }
            }
        }
    ]
    
}
