<template>
  <div class="base-html-nav">
    <ul>
      <li v-for="link in links" :key="link">
        <router-link :to="{name:link}">{{ link }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: ["props-static", "props-dynamic-base"]
    };
  }
};
</script>

<style>
</style>
