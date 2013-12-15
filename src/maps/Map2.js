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
        doorStart: 36
    },
    
    exits: {
        doorStart: {pos: 35, map: "MapStart"}
    },
    
    scripts: [
        {
            pos: {x: 0, y:3},
            onFirstEnter: function() {
            
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
