<template>
  <div class="add-slot">
    <h3>{{ __MARK }}</h3>
    <p>PROP_ITEMS: {{ Object.keys(PROP_ITEMS) }}</p>
    <select :value="props.entry" @change="props.entry = $event.target.value">
      <option disabled value>请选择入口 flexbox</option>
      <option v-for="item in props.children" :key="item._id" :value="item._id">{{item._id}}</option>
    </select>
    <div :class="{'only-show-child': onlyShowChild}">
      <div class="value-item" v-for="item in PROP_ITEMS.filter(v=>v!=='entry')">
        {{ item.propKey }} : {{ item.type || item.schema._type|| item.schema.type }}
        <div
          class="switch"
          v-if="item.schema && item.schema._type && item.schema._type.startsWith('Flexbox')"
        >
          <div class="option-item" style="cursor: pointer">
            <input type="checkbox" id="only-show-child" v-model="onlyShowChild">
            <label for="only-show-child">只显示 child</label>
          </div>
        </div>
        <ValModel
          :available-slots="props.children"
          :schema="item.schema"
          v-model="props[item.propKey]"
        >
          <template slot-scope="leaf" slot="leaf">
            <button @click="read(leaf)">选中</button>
            <button>设置数据来源</button>
            <button>设置数据转换方法</button>
            <button>设置关联数据处理</button>
          </template>
        </ValModel>
      </div>
    </div>
  </div>
</template>

        </ValModel>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import PropKeysMixin from "@/mixins/PROP_KEYS";
import ValModel from "@/v-model";
import { getExample } from "@/definitions";

import RUNTIME from "./index";

const DEFAULT = Object.entries(RUNTIME.props).reduce(
  (result, [propKey, propItem]) => {
    result[propKey] = propItem.schema ? getExample(propItem.schema) : "";
    return result;
  },
  {}
);

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
    },
    read(leaf) {
      console.info(leaf, "leaf");
    }
  }
};
</script>

<style lang="less" scoped>
.add-slot {
  height: 100%;
  overflow: auto;
}
</style>

