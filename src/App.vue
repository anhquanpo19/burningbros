<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() { },
  computed: {
    layout() {
      return "layout-" + (this.$route.meta.layout || "default");
    },
  },
});
</script>
