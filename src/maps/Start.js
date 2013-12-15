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
            onAttemptToEnter: function(event) {
                if (!event.entity.isPlayer()) return;
                event.context.open = true;
                ts("You see a stone door infront of you. It does not have a lock.");
                ts("You carefully push it open.");
                event.context.removeObserver(this);
            }
        },
        // trip
        {
            pos: [5,3],
            args: {track: true },
            onFirstEnter: function(event) {
                if (event.entity.isPlayer()) {
                    ts("You slip on the wet ground and hit your head.");
                    event.context.removeObserver(this);
                }
            }
        }
    ]
    
}
