<template>
  <div class="input-array">
    <draggable
      class="list-group"
      v-model="myArray"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group :name="!drag ? 'flip-list' : null">
        <div v-for="(element,idx) in myArray" :key="getId(element)">
          <button @click="del(idx)">x</button>
          <ValModel :schema="schema.items" :value="element" @input="emit($event, idx)"/>
        </div>
      </transition-group>
    </draggable>
    <button @click="addOneItem">添加一项</button>
  </div>
</template>

<script>
import ArrayMixin from "./_mixins/array";

export default {
  name: "VArray",
  mixins: [ArrayMixin]
};
</script>
<style lang="less" scoped>
@import url("./array.less");
.input-array {
  border: thin solid silver;
  padding: 0.3em;
}
</style>
