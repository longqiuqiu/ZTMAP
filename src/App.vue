<template>
  <div id="app">
    <main class="row">
      <transition name="component-fade" mode="out-in">
        <component :is="currentView"></component>
      </transition>
      <!--地图-->
      <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="article" @click="closeLi()"><router-view></router-view></article>
    </main>
  </div>
</template>
<script>

export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    developTab: function(ind, view) {
      this.currentView = view;
      this.isHover = ind;
    },
    closeLi: function() {
      this.currentView = '';
      this.isHover = -1;
    }
  },
  components:{
  }
}

</script>
<style lang="scss">
  @import './assets/css/appVue.scss';

  .navbar.navbar-inverse {
    border-radius: 0;
    margin-bottom: 0;
  }
</style>
