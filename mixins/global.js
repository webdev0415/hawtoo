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
        }
    }
}