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
          :direction="value.direction"
          @input="emit($event, KEY)"
        />
      </div>
    </div>
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

export default {
  name: "VObject",
  mixins: [ObjectMixin]
};
</script>

<style lang="less" scoped>
.property {
  border: thin solid silver;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
}
</style>

