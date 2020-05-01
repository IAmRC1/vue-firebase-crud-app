<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-sm bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addevent" class="nav-link">Add Event</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/viewevent" class="nav-link">View Events</router-link>
        </li>
      </ul>
    </nav>
    <div class="mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="css">
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
#app {
  font-family: 'Raleway', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
