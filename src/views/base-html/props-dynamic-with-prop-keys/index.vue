<template>
  <div class="base-html-div">
    {{ __MARK }} / DIV
    <pre>
            {{ color }}
            {{ status }}
        </pre>
  </div>
</template>

<script>
class Color extends String {
  constructor() {}
}

Color.toString = () => "function String";
const Status = {
  schema: {
    type: "enum"
  }, // JSON schema
  toString: () => `function Status`,
  validator(value) {
    console.info("this", this, Status.schema);
    const warn = ["success", "warning", "danger"].indexOf(value) !== -1;
    warn ||
      console.warn(
        `value:\`${value}\` is invalid, it should be one of ["success", "warning", "danger"]`
      );
    return typeof value === "string";
  }
};

console.info(Status.toString());

export default {
  props: {
    value: null,
    content: {
      type: String,
      default: "content"
    },
    color: Color,
    status: Status,
    __MARK: null
  }
};
</script>

<style>
</style>
