<template>
  <div class="base-html-div-d">
    <h3>{{ __MARK }}</h3>
    <p>{{ propKeys }}</p>
    <div class="value-item" v-for="item in propKeys">
      {{ item }}:
      <input v-model="props[item]">
    </div>
  </div>
</template>

<script>
import _ from "lodash";

const DEFAULT = {
  value: ""
};

export default {
  props: {
    value: null,
    __MARK: null,
    propKeys: {
      default: () => []
    }
  },
  data() {
    return {
      props: _.cloneDeep(DEFAULT),
      aNewOne: ""
    };
  },
  computed: {
    options() {
      return Object.keys(this.props);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.initValue(val);
      }
    },
    props: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    initValue(val) {
      if (!val || typeof val !== "object") {
        val = {};
      }
      Object.keys(DEFAULT).forEach(key => {
        this.props[key] = _.cloneDeep(
          val[key] === undefined ? DEFAULT[key] : val[key]
        );
      });
    },
    addOption() {
      const key = this.aNewOne;
      if (key && DEFAULT[key] === undefined) {
        DEFAULT[key] = "";
        this.$set(this.props, key, "");
        this.initValue(this.value);
      }
    }
  }
};
</script>

<style>
</style>
