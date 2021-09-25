import Vue from "vue";

const filters = {

    /**
     * Function: Processing timestamps according to the given time / date format
    * @param {Number} Date Timestamp
    * @returns {string} time / date string after specification
     */
    formatDate(value) {
        if (value) {
            return new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long',
            }).format(Date.parse(value))
        } else {
            return 'INVALID DATE'
        }
    },

    /**
     * Limit the size of a string.
     * @param {string} value String to limit.
     * @param {int} size Amount to limit.
     * @returns {string} Limited string.
     */
    strLimit(value, size) {
        if (!value) {
            return "";
        }
        value = value.toString();

        if (value.length <= size) {
            return value;
        }

        return value.substr(0, size) + "...";
    },

    capitalize(string) {
        console.log(string);
        return string[0].toUpperCase() + string.slice(1);
    }
};

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});
