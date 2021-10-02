export default {
    data() {
        return {

        }
    },

    computed: {

    },

    methods: {
        isObjectEmpty(someObject) {
            return !(Object.keys(someObject).length)
        },
        notEmptyObject(someObject) {
            return (Object.keys(someObject).length > 0);
        },
        /**
         * Used for skeletons. Until better solution lol.
         * @param {int} max How many object keys there should be created.
         * @returns object
         */
        createEmptyObject(max) {
            const filledArray = [];
            let i;

            for (i = 0; i < max; i++) {
                filledArray[i] = {
                    'key': i
                };
            };

            return filledArray;
        }
    }
}