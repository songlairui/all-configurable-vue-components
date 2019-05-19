<template>
  <div class="add-slot">
    <h3>{{ __MARK }}</h3>
    <p>PROP_ITEMS: {{ Object.keys(PROP_ITEMS) }}</p>
    <div class="option-item" style="cursor: pointer">
      <input type="checkbox" id="only-show-child" v-model="onlyShowChild">
      <label for="only-show-child">FlebBox 只显示 child</label>
    </div>
    <div :class="{'only-show-child': onlyShowChild}">
      <div class="value-item" v-for="item in PROP_ITEMS">
        {{ item.propKey }} : {{ item.type || item.schema._type|| item.schema.type }}
        <ValModel :schema="item.schema" :type="item.type" v-model="props[item.propKey]"/>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import PropKeysMixin from "@/mixins/PROP_KEYS";
import ValModel from "@/v-model";

const DEFAULT = {
  value: "",
  child: [],
  layout: []
};

export default {
  mixins: [PropKeysMixin],
  components: { ValModel },
  props: {
    value: null,
    __MARK: null
  },
  data() {
    return {
      props: _.cloneDeep(DEFAULT),
      aNewOne: "",
      onlyShowChild: false
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
