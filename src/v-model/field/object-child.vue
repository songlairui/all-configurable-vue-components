<template>
  <div class="field-object-child">
    <div class="overlay">
      <slot name="overlay"/>
    </div>
    <div class="sub-block">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    childKey: {
      type: String,
      default: "child"
    }
  }
};
</script>
<style lang="less">
.only-show-child {
  .field-object-child {
    .overlay {
      display: none;
    }
    &:hover > .overlay {
      display: block;
    }
  }
}
</style>



