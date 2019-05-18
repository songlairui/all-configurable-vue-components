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
          <ValModel :schema="schema.items" :value="element" @input="emit($event, idx)"/>
        </div>
      </transition-group>
    </draggable>
    <button @click="addOneItem">添加一项</button>
  </div>
</template>

<script>
import DEFINITIONS, { getExample } from "@/definitions";

import ValModel from "./index";

export default {
  name: "VArray",
  components: { ValModel },
  props: {
    schema: {
      default: () => ({})
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      drag: false
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    myArray: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    getId(item) {
      if (!item) {
        return "-";
      }
      switch (typeof item) {
        case "object":
          return item._id || Object.values(item)[0];
        default:
          return `${item}`;
      }
    },
    addOneItem() {
      const exampleItem = getExample(this.schema.items);
      this.$emit("input", [...this.value, exampleItem]);
    },
    emit(val, idx) {
      const newVal = [...this.value];
      newVal.splice(idx, 1, val);
      this.$emit("input", newVal);
    }
  }
};
</script>
<style lang="less" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
