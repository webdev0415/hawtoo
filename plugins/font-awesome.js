import Vue from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";

import {
    faCopy,
    faExclamationTriangle,
    faArrowLeft,
    faArrowRight,
    faArrowDown,
    faChartBar,
    faCog,
    faFileContract,
    faFile
} from "@fortawesome/pro-light-svg-icons";

// import { faBinanceIcon, faEthereumIcon } from "../assets/icons/fa";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(faCopy, faExclamationTriangle, faArrowLeft, faArrowRight, faChartBar, faArrowDown, faCog, faFileContract, faFile);
// library.add(faBinanceIcon, faEthereumIcon);

Vue.component("FontAwesome", FontAwesomeIcon);
