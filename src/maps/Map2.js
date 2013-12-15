var Map2 = {
    name: "Map2",
    w: 11,
    h: 7,
    tileString: 
        "           " +
        "  ———+———  " +
        "  |     |  " +
        "  +    {|  " +
        "  |     |  " +
        "  ——+————  " +
        "           ",
        
    entrances: {
        doorStart: [3,3]
    },
    
    exits: {
        doorStart: {pos: 35, map: "MapStart"}
    },
    
    scripts: [
        {
            args: {track: true},
            pos: [3,3],
            onFirstEnter: function() {
                ts({clear: true});
                ts("A gigantic head of a statue observes you from the opposite site of the room.");
                ts("It is worked into the wall and looks like a Mayan priest.");
                ts("There are two doors in this room.");
            }
        },
        {
            pos: [6,2],
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
