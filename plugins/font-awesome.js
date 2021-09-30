import Vue from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";

import {
    faCopy, faExclamationTriangle, faArrowLeft, faArrowRight,
    faArrowDown, faChartBar, faCog, faFileContract, faFile,
    faBullhorn
} from "@fortawesome/pro-light-svg-icons";

import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'

import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons'

// import { faBinanceIcon, faEthereumIcon } from "../assets/icons/fa";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

library.add(
    faCopy,
    faExclamationTriangle,
    faArrowLeft,
    faArrowRight,
    faChartBar,
    faArrowDown,
    faCog,
    faFileContract,
    faFile,
    faBullhorn,
    faDiscord,
    faTwitter,
    faSpinnerThird
);

// library.add(faBinanceIcon, faEthereumIcon);

Vue.component("FontAwesome", FontAwesomeIcon);
