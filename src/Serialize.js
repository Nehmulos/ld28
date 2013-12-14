function Serialize(serialObj, key, value, writeNull, skipFunctions) {
    if (typeof value == "object") {
        if (value.serialize) {
            serialObj[key] = value.serialize();
        } else {
            var obj = {};
            for (var k in value) {
                serialize(obj, k, value[k]);
            }
            serialObj[key] = obj;
        }
    }
    
    if (value == undefined) {
        return;
    }
    if (value == null && !writeNull) {
        return;
    }
    if (skipFunctions && typeof value == "function") {
        return;
    }
    serialObj[key] = value;
}
