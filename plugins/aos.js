import AOS from "aos";

import "aos/dist/aos.css";

export default ({ app }) => {
    // eslint-disable-next-line
    app.AOS = new AOS.init({
        once: true,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        startEvent: 'load',
        disable: 'phone',
        duration: 700,
        easing: 'ease-out-cubic',
    });
};