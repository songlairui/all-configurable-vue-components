<template>
  <div class="base-html df-h d-f d-f-v">
    <div class="title">
      <h1>Base Html</h1>
      <button @click="prune">Snap</button>
      <button @click="getPropKeys">Trans Prop Keys</button>
      {{ propKeys }}
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
          :propKeys="propKeys"
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
      propKeys: []
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
      this.getPropKeys();
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
    getPropKeys() {
      console.info("this.$refs.", this.$refs, this.$children);
      const { d } = this.$refs;
      if (!d) {
        return;
      }
      this.propKeys = d.$options._propKeys.filter(
        item => !item.startsWith("_")
      );
    }
  },
  created() {
    this.rescue();
    console.info("this", this);
  },
  mounted() {
    this.getPropKeys();
  }
};
</script>

<style>
</style>
