<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
.process-fail::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 2px;
  background-color: #ff0000;
}
.process-success::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 2px;
  background-color: #52c41a;
}
.process-wait::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 2px;
  background-color: yellow;
}
.process-stop::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 2px;
  background-color: black;
}
.process-success::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 2px;
  background-color: gray;
}
.pd40 {
  padding: 40px;
}
</style>
