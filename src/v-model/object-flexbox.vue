<template>
  <div class="input-object" :class="{leaf:isLeaf}">
    <FiledObjectChild>
      <div
        v-for="(KEY) in KEYS"
        class="property d-f"
        :key="KEY"
        :slot="KEY === 'child' ? 'default' : 'overlay'"
      >
        <div class="label">
          <span @click="del(KEY)" class="del">x</span>
          {{ KEY }}
        </div>
        <div class="holder d-f-h">
          <ValModel
            :label="KEY"
            :placeholder="KEY"
            :schema="fullfilSchema.properties[KEY]"
            :value="value[KEY]"
            :direction="value.direction"
            :available-slots="availableSlots"
            @input="emit($event, KEY)"
          />
        </div>
      </div>
      <div v-if="isLeaf">
        <select
          :value="value.slot"
          @change="$event.target.value ? emit($event.target.value, 'slot') : del('slot')"
        >
          <option disabled>请选择入口 flexbox</option>
          <option value>--</option>
          <option v-for="item in availableSlots" :key="item._id" :value="item._id">{{item._id}}</option>
        </select>
      </div>
    </FiledObjectChild>

    <template v-if="addAble">
      <template v-if="KEYS_TO_ADD.length === 1">
        <button @click="selectKey(KEYS_TO_ADD[0])">+ {{ KEYS_TO_ADD[0] }}</button>
      </template>
      <template v-else>
        <select ref="select" @change="selectKey($event.target.value)">
          <option disabled value>请选择</option>
          <option v-for="KEY_TO in KEYS_TO_ADD" :key="KEY_TO" :value="KEY_TO">+ {{ KEY_TO }}</option>
        </select>
        <button @click="selectKey($refs.select.value)">+</button>
      </template>
    </template>
  </div>
</template>

<script>
import ObjectMixin from "./_mixins/object";
import FiledObjectChild from "./field/object-child";

export default {
  name: "VObjectFlexbox",
  mixins: [ObjectMixin],
  components: { FiledObjectChild },
  props: {
    availableSlots: null
  },
  computed: {
    isLeaf() {
      // 没有 child, 即为叶子节点
      return !this.KEYS.includes("child");
    }
  }
};
</script>

<style lang="less" scoped>
.input-object {
  padding: 2px;
  &.leaf {
    background: springgreen;
  }
  .property {
    padding: 1em 0.5em 0.3em;
    position: relative;

    border: thin solid silver;
    border-radius: 4px;
    margin: 3px;

    > .label {
      font-size: 12px;
      color: cornflowerblue;
      position: absolute;
      top: 1px;
      left: 3px;
      &::after {
        content: " :";
      }
      > .del {
        cursor: pointer;
        color: red;
        display: inline-block;
        padding: 0 2px;
      }
    }
  }
}
</style>

