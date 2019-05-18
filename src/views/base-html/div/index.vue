<template>
  <div class="base-html-div">
    {{ __MARK }} / DIV
    <pre>
            {{ value }}
            {{ content }}
            {{ color }}
        </pre>
    <helper>- Helper here -</helper>
  </div>
</template>

<script>
import Helper from "./help";

export default {
  components: { Helper },
  props: {
    value: null,
    content: null,
    color: null,
    __MARK: null
  }
};
</script>

<style>
</style>
