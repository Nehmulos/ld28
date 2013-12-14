function Serialize(serialObj, key, value, writeNull, skipFunctions) {
    if (value == undefined) {
        return;
    }
    if (value == null && !writeNull) {
        return;
    }
    
    if (typeof value == "object") {
        if (value && value.serialize) {
            serialObj[key] = value.serialize();
        } else {
            var obj = {};
            for (var k in value) {
                serialize(obj, k, value[k]);
            }
            serialObj[key] = obj;
        }
    }
    
    if (typeof value == "function") {
        if (skipFunctions) {
            return;
        } else {
            serialObj[key] = value.toString();
        }
    }
    serialObj[key] = value;
}
