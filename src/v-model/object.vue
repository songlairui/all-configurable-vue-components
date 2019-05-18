<template>
  <div class="input-object">
    <div class="property d-f" v-for="(KEY) in KEYS" :key="KEY">
      <div class="label">{{ KEY }}</div>
      <div class="holder d-f-h">
        <ValModel
          :label="KEY"
          :placeholder="KEY"
          :schema="fullfilSchema.properties[KEY]"
          :value="value[KEY]"
          @input="emit($event, KEY)"
        />
      </div>
    </div>
    <template v-if="addAble">
      <select @change="selectKey($event)">
        <option value>请选择</option>
        <option v-for="KEY_TO in KEYS_TO_ADD" :key="KEY_TO" :value="KEY_TO">+ {{ KEY_TO }}</option>
      </select>
    </template>
  </div>
</template>

<script>
import _ from "lodash";
import DEFINITIONS, { getExample, getSchemaByref } from "@/definitions";
import ValModel from "./index";

export default {
  name: "VObject",
  components: { ValModel },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    schema: {
      default: () => ({})
    }
  },
  data() {
    return {
      KEYS: Object.keys(this.schema.properties).slice(0, 1),
      emitValue: _.cloneDeep(getExample(this.schema))
    };
  },
  computed: {
    fullfilSchema() {
      const { properties } = this.schema;
      const fullfil = {};
      Object.entries(properties).forEach(([key, value]) => {
        fullfil[key] = value.$ref ? getSchemaByref(value) : value;
      });
      return { ...this.schema, properties: fullfil };
    },
    ALL_KEYS() {
      return Object.keys(this.schema.properties);
    },
    addAble() {
      return this.ALL_KEYS.length > this.KEYS.length;
    },
    KEYS_TO_ADD() {
      return this.ALL_KEYS.filter(key => !this.KEYS.includes(key));
    }
  },
  methods: {
    selectKey(e) {
      if (e.target.value) {
        this.KEYS.push(e.target.value);
      }
    },
    emit(val, KEY) {
      const { ...newVal } = this.value;
      newVal[KEY] = val;
      this.$emit("input", newVal);
    }
  }
};
</script>

<style lang="less" scoped>
.property {
  border: thin solid silver;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
}
</style>

