function Resources() {
    this.director = cc.Director.sharedDirector;
}

/// I modified lib/cocos2d-beta2.js to make this work
/// this function does not work with the official release!
Resources.prototype.registerResource = function(path, mimetype, alias) {
    alias = alias || path;
    cc.jah.resources[alias] = {data: path, mimetype: mimetype, remote:true};
    this.director.preloader().addToQueue(path);
};

// TODO integrate audio loading into the preloader
Resources.prototype.registerAudio = function(name) {
    Audiomanager.instance.load({ 
        "ogg": "audio/"+name+".ogg",
        "aac": "audio/conversions/"+name+".aac",
        "wav": "audio/conversions/"+name+".wav",
        
    }, name); 
}

Resources.prototype.load = function() {
    // list your images here
    // they will be loaded with the loadingscreen before your game starts
    
    //this.registerResource("images/badge.png", "image/png"); // the debug sprite
    
    // preload audio files
    //this.registerAudio("village-tired");
}

Resources.instance = new Resources();
