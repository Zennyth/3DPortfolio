import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// css assets
import "@/assets/sass/main.scss";

// store
import store from "@/store"

// directives
import { appear } from './directives/visibility';

// global
import Animated from "@/components/Animated.vue";

// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, fab);

createApp(App)
  .use(router)
  .use(store)
  .directive('appear', appear)
  .component("fa", FontAwesomeIcon)
  .component(Animated.name, Animated)
  .mount('#app')
