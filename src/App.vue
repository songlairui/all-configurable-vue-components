<template>
  <div id="app" class="d-f d-f-v">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/renders">Renders</router-link>|
      <router-link to="/base-html">BaseHtml</router-link>|
    </div>
    <div class="stage d-f df-h">
      <nav class="sub-nav">
        <router-view name="nav"/>
      </nav>
      <div class="main d-f df-h">
        <router-view/>
      </div>
      <div class="stores">
        <h3>Vuex</h3>
        <dl>
          <dt>getter</dt>
          <dd>customCondition</dd>
          <dt>action</dt>
          <dd>RESET</dd>
        </dl>
        <dl>
          <dt>API</dt>
          <dt>data</dt>
        </dl>
        <dl>
          <dt>TODO</dt>
          <dd>组件的js方法, 服务端统计调用频次,动态划分chunk</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style lang="less">
html,
body,
#app {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.stage {
  overflow: hidden;
}
.d-f {
  display: flex;
  &-v {
    flex-direction: column;
  }
}
.df-h {
  flex: 9;
}
.f-c-c {
  justify-content: center;
  align-items: center;
  word-break: break-all;
}
nav.sub-nav,
.main,
.dashboard {
  margin: 0.5em;
  border: medium mediumseagreen double;
  border-radius: 1em;
  padding: 0.5em;
  overflow: hidden;
}
.sub-nav {
  flex: 0 0 15em;
}
.main {
  flex: 5;
}
.sub-main {
  flex: 2 0 768px;
}
.dashboard {
  flex: 1 0 768px;
}
.overh {
  overflow: hidden;
}
.overauto {
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>
