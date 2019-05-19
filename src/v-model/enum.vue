<template>
  <div class="input-enum">
    <template v-if="enums.length < 4">
      <div v-for="item in enums">
        <input
          :key="item"
          type="radio"
          :id="item"
          :value="item"
          :checked="item === value"
          @input="emitValue = $event.target.value"
        >
        <label :key="`${item}-l`" :for="item">{{ item }}</label>
      </div>
    </template>
    <div v-else>
      123
      <select :value="value" @change="emitValue = $event.target.value">
        <option v-for="item in enums" :key="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import BaseEmit from "./_mixins/base-type";

export default {
  name: "VString",
  mixins: [BaseEmit],
  props: {
    enums: {
      type: Array,
      default: () => []
    }
  }
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

