<template>
  <div class="input-array">
    <draggable
      class="list-group"
      v-model="myArray"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group :class="directionClass" tag="div" :name="!drag ? 'flip-list' : null">
        <div v-for="(element,idx) in myArray" :key="getId(element)">
          <button @click="del(idx)">x</button>
          <ValModel :schema="schema.items" :value="element" @input="emit($event, idx)"/>
        </div>
        <button @click="addOneItem" key="last">+</button>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import DEFINITIONS, { getExample } from "@/definitions";
import ArrayMixin from "./_mixins/array";

export default {
  name: "VArrayFlexbox",
  mixins: [ArrayMixin],
  props: {
    direction: String
  },
  computed: {
    directionClass() {
      return this.direction === "column" ? "deep-f-v" : "deep-f-h";
    }
  },
  created() {
    if (!this.myArray.length) {
      this.addOneItem();
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./array.less");

@deep: ~">>>";

.input-array {
  border: thin solid silver;
  padding: 0.3em;
  .deep-f-h {
    display: flex;
  }
}
</style>
