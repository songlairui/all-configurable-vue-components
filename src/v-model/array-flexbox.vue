<template>
  <div class="input-array">
    <draggable
      class="list-group"
      v-model="myArray"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group
        class="list-wrapper"
        :class="directionClass"
        tag="div"
        :name="!drag ? 'flip-list' : null"
      >
        <div class="array-item-with-actions" v-for="(element,idx) in myArray" :key="getId(element)">
          <button class="move-trigger">🏃</button>
          <button class="close" @click="del(idx)">x</button>
          <ValModel
            :available-slots="availableSlots && availableSlots.filter(item => item._id !== element._id)"
            :schema="fullfilSchema.items"
            :value="element"
            @input="emit($event, idx)"
          >
            <template v-slot:leaf="leaf">
              <slot v-bind="leaf" name="toleaf"/>
            </template>
          </ValModel>
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
    direction: String,
    availableSlots: null
  },
  computed: {
    directionClass() {
      return this.direction === "column" ? "deep-f-v" : "deep-f-h";
    }
  },
  mounted() {
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
  border: thin solid darkseagreen;
  background: cornsilk;
  margin: 3px;
  border-radius: 3px;
  padding: 0.3em;
  .deep-f-h {
    display: flex;
  }
}
.list-wrapper {
  overflow: auto;
}
.array-item-with-actions {
  border: thin solid cadetblue;
  background: rgba(255, 255, 255, 0.9);
  margin: 3px;
  border-radius: 3px;
  position: relative;
  .move-trigger,
  .close {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    cursor: pointer;
    border-radius: 4px;
    border: thin solid transparent;
    z-index: 99;
  }
  .close {
    background: maroon;
    color: lavenderblush;
  }
  .move-trigger {
    right: 2em;
    border: thin solid mediumslateblue;
  }

  &:hover > .move-trigger,
  &:hover > .close {
    display: inline;
  }
}
</style>
