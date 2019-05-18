<template>
  <div class="base-html-div-d">
    <h3>{{ __MARK }}</h3>
    <div class="value">
      value:
      <input v-model="props.value">
    </div>
    <div class="content">
      content:
      <input v-model="props.content">
    </div>
    <div class="color">
      color:
      <input v-model="props.color">
    </div>
    <div class="stage">{{ value }}</div>
  </div>
</template>

<script>
import _ from "lodash";

const DEFAULT = {
  value: "",
  content: "",
  color: ""
};

export default {
  props: {
    value: null,
    __MARK: null
  },
  data() {
    return {
      props: _.cloneDeep(DEFAULT)
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!val || typeof val !== "object") {
          val = {};
        }
        Object.keys(DEFAULT).forEach(key => {
          this.props[key] = _.cloneDeep(
            val[key] === undefined ? DEFAULT[key] : val[key]
          );
        });
      }
    },
    props: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style>
</style>
