<template>
  <a-layout :class="['client-layout']">
    <a-layout-header
      :style="{
        position: 'fixed',
        zIndex: 2,
        width: '100%',
        background: '#fff',
      }"
    >
      <layout-header />
    </a-layout-header>
    <a-layout-content :style="{ marginTop: '64px' }">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="c-footer">
      <layout-footer />
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import LayoutHeader from "./header/header.vue";
import LayoutFooter from "./footer/default.vue";
export default defineComponent({
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutFooter,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.client-layout .ant-layout-header {
  padding: 0;
}
</style>
