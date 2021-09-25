import { has } from 'lodash';

const MINUTES = 15;
const ITEM_NAME = 'hawtoo.visit';

export default {
    hasVisited() {
        if (!this.isStorageSupported()) {
            return false;
        }

        const visited = localStorage.getItem(ITEM_NAME);
        if (!visited) {
            return false;
        }

        const item = JSON.parse(visited);

        if (!has(item, 'expires')) {
            this.clearVisited();
            return false;
        }

        const today = new Date();
        if (today.getTime() >= item.expires) {
            this.clearVisited();
            return false;
        }

        return true;
    },

    getVisited() {
        if (!this.isStorageSupported()) {
            return [];
        }

        const visited = localStorage.getItem(ITEM_NAME);
        if (!visited) {
            return [];
        }

        const item = JSON.parse(visited);
        if (!has(item, 'data')) {
            this.clearVisited();
            return [];
        }

        return item.data;
    },

    saveVisited(cookiesGroups) {
        if (!this.isStorageSupported()) {
            return;
        }

        const date = new Date();
        const item = {
            data: cookiesGroups,
            expires: date.setTime(
                date.getTime() + MINUTES * 60 * 1000
            ),
        };
        localStorage.setItem(ITEM_NAME, JSON.stringify(item));
    },

    clearVisited() {
        if (!this.isStorageSupported()) {
            return;
        }

        localStorage.removeItem(ITEM_NAME);
    },

    isStorageSupported() {
        try {
            const key = 'gdpr_local_storage_test_key';
            localStorage.setItem(key, key);
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    },
};