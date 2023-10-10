import App from "@/App.vue";
import { Icon } from "@/components/icons/icons";
import { defaultLocale, languages } from "@/i18n/index.js";
import router from "@/router";
import Antd, { Badge } from "ant-design-vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import "./theme/index.less";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const messages = Object.assign(languages);
const i18nConfig = {
  legacy: false,
  locale: defaultLocale,
  messages,
};

const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(Antd)
  .use(createI18n(i18nConfig))
  .component("icon", Icon)
  .component("badge", Badge)

router.isReady().then(() => app.mount("#app"));
