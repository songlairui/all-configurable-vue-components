<template>
  <div class="input-object">
    <FiledObjectChild>
      <div
        class="property d-f"
        v-for="(KEY) in KEYS"
        :key="KEY"
        :slot="KEY === 'child' ? 'default' : 'overlay'"
      >
        <div class="label">{{ KEY }}</div>
        <div class="holder d-f-h">
          <ValModel
            :label="KEY"
            :placeholder="KEY"
            :schema="fullfilSchema.properties[KEY]"
            :value="value[KEY]"
            :direction="value.direction"
            @input="emit($event, KEY)"
          />
        </div>
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
  components: { FiledObjectChild }
};
</script>

<style lang="less" scoped>
.input-object {
  padding: 2px;
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
    }
  }
}
</style>

