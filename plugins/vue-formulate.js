/* eslint-disable no-console */
import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
import debounce from 'lodash.debounce';

export default ({ app, store }) => {
    Vue.use(VueFormulate, {
        /** Important validation rules */
        rules: {
            noSpecialChars: (value) => {
                const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

                if (format.test(value.value)) {
                    return false;
                } else {
                    return true;
                }
            },
            usernameExists: (value) => {
                return true;
            },
            noSameMarketPlace: debounce((context) => {
                const formValues = context.getFormValues()
                const dups = []
                let isDuplicate = true
                if ('links' in formValues && formValues.links.length > 0) {
                    formValues.links[0].marketplaces.forEach(element => {
                        if (dups.includes(element.name)) {
                            console.log("Element already exist")
                            isDuplicate = false
                        }
                        else {
                            dups.push(element.name)
                        }
                    });
                    return isDuplicate
                }
                return isDuplicate

            }, 300),
            noSameSocialLink: debounce((context) => {
                const formValues = context.getFormValues()
                const dups = []
                let isDuplicate = true
                if ('links' in formValues && formValues.links.length > 0) {
                    formValues.links[0].socials.forEach(element => {
                        if (dups.includes(element.name)) {
                            console.log("element already exist")
                            isDuplicate = false
                        }
                        else {
                            dups.push(element.name)
                        }
                    });
                    return isDuplicate
                }
                return isDuplicate

            }, 300),
        },
        classes: {
            outer(context) {
                switch (context.type) {
                    case "file":
                        return "";
                    default:
                        return "form-control mb-3 relative";
                }
            },
            input(context) {

                switch (context.type) {
                    case "submit":
                        return "btn bg-blue-500 hover:bg-blue-600 border-blue-500 rounded-lg text-white px-8 py-3";
                    case "checkbox":
                        return "hawtoo-checkbox";
                    case "radio":
                        return "hawtoo-radio";
                    case "textarea":
                        return "block w-full border border-gray-300 rounded-md shadow-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500";
                    case "file":
                        return "absolute inset-0 w-full h-full border-gray-400 rounded-md opacity-0 cursor-pointer";
                    default:
                        return "block w-full border border-gray-300 rounded-md shadow-xs py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm";
                }
            },

            label(context) {
                switch (context.type) {
                    case "checkbox":
                        return "label cursor-pointer font-medium text-sm";
                    case "radio":
                        return "label cursor-pointer font-medium text-sm";
                    default:
                        return "mb-2 block text-sm font-medium text-gray-700";
                }
            },
            help: "mt-2 text-sm text-gray-500",
            error: "bg-red-100 text-red-800 p-3 mt-2 rounded-md"
        }
    });
}