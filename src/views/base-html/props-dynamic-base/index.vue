<template>
  <div class="base-html-div">
    {{ __MARK }} / DIV
    <pre>
            {{ value }}
            {{ content }}
            {{ color }}
        </pre>
  </div>
</template>

<script>
export default {
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
