import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { provideDependencies } from "@/helpers/dependencyInjectionHelper";
import BaseLoader from "@/components/BaseLoader.vue";

provideDependencies();

const app = createApp(App);
app.component("BaseLoader", BaseLoader);
app.use(router);
app.mount("#app");
