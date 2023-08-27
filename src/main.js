import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUser, faSquareCaretRight);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .mount("#app");
