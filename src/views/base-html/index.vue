<template>
  <div class="base-html df-h d-f d-f-v">
    <div class="title">
      <h1>Base Html</h1>
      <button @click="prune">Snap</button>
      <button @click="getPropsValidator">Trans Prop Keys</button>
    </div>
    <div class="content d-f df-h">
      <div class="main">
        <router-view ref="d" :__MARK="mark" v-bind="value"></router-view>
      </div>
      <div class="dashboard">
        <router-view
          ref="da"
          name="dashboard"
          :__MARK="mark | d"
          v-model="value"
          :propsValidator="propsValidator"
        ></router-view>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mark: "BaseHtml",
      value: {},
      propsValidator: {}
    };
  },
  filters: {
    d: str => `${str}·Dashboard`
  },
  computed: {
    pageId() {
      return this.$route.name;
    }
  },
  watch: {
    "$route.name"() {
      this.rescue();
      this.getPropsValidator();
    }
  },
  methods: {
    prune() {
      localStorage.setItem(this.pageId, JSON.stringify(this.value));
    },
    rescue() {
      const str = localStorage.getItem(this.pageId);
      try {
        this.value = JSON.parse(str);
      } catch (error) {
        this.value = {};
      }
    },
    getPropsValidator() {
      const { d } = this.$refs;
      if (!d || !d.$options.props) {
        return;
      }
      this.propsValidator = d.$options.props;
    }
  },
  created() {
    this.rescue();
    console.info("this", this);
  },
  mounted() {
    this.getPropsValidator();
  }
};
</script>

<style>
</style>
