<template>
  <div class="input-string">
    <input
      :placeholder="placeholder"
      type="text"
      :value="emitValue"
      @input="emitValue = $event.target.value"
    >
  </div>
</template>

<script>
import BaseEmit from "./_mixins/base-type";

export default {
  name: "VString",
  mixins: [BaseEmit]
};
</script>

<style lang="less" scoped>
.input-string {
  border: thin solid lavender;
  border-radius: 3px;
  input {
    padding: 0.3em 0.5em;
  }
}
</style>

