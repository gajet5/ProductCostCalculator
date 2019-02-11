module.exports = {
    string(string, limit) {
        return string.length > limit;
    },
    stringInArray(array, nameField, limit) {
        for (let item of array) {
            if (item[nameField].length > limit) {
                return true;
            }
        }
        return false;
    }
};
