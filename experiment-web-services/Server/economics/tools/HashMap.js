// This software was developed by the United States Army,
// Night Vision Electronic Sensor Directorate (NVESD)
// For distribution and licensing information contact:
//
// U. S. Army
// RDECOM, NVESD
// 10221 Burbeck Road
// Room 122
// Ft. Belvoir, VA 22060
//
// This software is distributed WITHOUT ANY WARRANTY; without even
// the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE.  In no event shall the contributors be liable
// for any loss or for any indirect, special, punitive, exemplary,
// incidental, or consequential damages arising from the use,
// possession or performance of this software.

/**
 * HashMap implementation
*/
exports.HashMap = function() {

    var data = {};

    /**
     * Associates the specified value with the specified key in this map.
     */
    function put(key, value) {
        data[key] = value;
    }

    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key. 
     */
    function get(key) {
        var returnValue = null;
        if(data[key]) {
            returnValue =  data[key];
        } else {
            console.log('HashMap.get invoked with invalid key: '+
                        key);
        }
        
        return returnValue;
    }

    /**    
     * Returns true if this map contains a mapping for the specified key.
     */
    function containsKey(key) {
        var returnValue = false;
        if(data[key])returnValue=true;
        return returnValue;
    }
    
    /**
     * Removes the mapping for the specified key from this map if present.
     */
    function remove(key) {
        if(data[key]) {
            delete data[key];
        } else {
            console.log('HashMap.remove invoked with invalid key: '+
                        key);
        }
    }
    
    /**
     * Returns an array containing the keys in this map.
     */
    function keys() {
        var keys = [];
        for (var key in data) {
            keys.push(key);
        }
        return keys;
    }


    /**
     * Returns an array containing the values in this map
     */
    function values() {
        var values = [];
        for (var key in data) {
            values.push(data[key]);
        }
        return values;
    }


    /**
     * Returns an array containing the key-value mappings
     */
    function entries() {
        var entries = [];
        for (var key in data) {
                entries.push({
                    key : key,
                    value : data[key]
                });
        }
        return entries;
    }
    
    /**
     * Returns true if this map contains no key-value mappings.
     */
    function isEmpty() {
        return Object.keys(data).length == 0;
    }

    /**
     * Returns the number of key-value mappings in this map.
     */
    function size(){
        return Object.keys(data).length;
    }

    return {
        put: put,
        get: get,
        containsKey: containsKey,
        remove: remove,
        keys: keys,
        values: values,
        entries: entries,
        isEmpty: isEmpty,
        size: size
    };
};
/*
if(typeof module != "undefined") {
    module.exports.HashMap = HashMap;
}
*/
