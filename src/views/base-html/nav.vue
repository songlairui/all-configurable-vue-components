<template>
  <div class="base-html-nav">
    <ul>
      <li v-for="link in links" :key="link">
        <router-link :to="{name:link}">{{ link }}</router-link>
      </li>
    </ul>
    <dl>
      <dt>动态Props</dt>
      <dd>策略1: dashboard 中 Object.keys(props)</dd>
    </dl>
  </div>
</template>

<script>
import routeMeta from "@/router/base-tags";

export default {
  data() {
    return {
      links: routeMeta["base-html"].children
    };
  }
};
</script>

<style>
</style>
