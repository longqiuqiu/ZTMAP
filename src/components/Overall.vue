<template>
  <div id="overall" class="tundra">
    <div id="map" @mousemove="showCoordinates($event)"></div>
    <button @click="centerZoom()" id="zoomCenter" class="btn btn-default" :class="{'hidden': isHide}">★</button>
    <div :class="{panelView: isPanelView}" v-show="isPanelView">
      <transition name="component-fade" mode="out-in">
        <component :is="panelView" :indxObj="indxObj"></component>
      </transition>
    </div>
    </div>
</template>
<script>
  import esriLoader from 'esri-loader'

  export default {
    name: 'overall',
    data () {
      return {
        map: {'loaded': ''},
        isHide: true,
        panelView:'panel',
        isPanelView: false,

        ref: this.ref(),
        location_lng: [],
        location_lat: [],
        lorrys: {},
        indxObj: {}

      }
    },
    watch: {
      'map.loaded': function () {
        if (this.map.loaded == true) {
          this.isHide = false;
          this.createCar();// 创建小车图标

          // 监听小车hover事件
          let imgCar = document.getElementById('layer_car_layer');
          let that = this;// this在监听时已经改变了
          imgCar.addEventListener('mouseover', function(e) {
            that.panelView = 'panel';
            that.isPanelView = true;

            let indx = e.graphic.attributes["count"],
                index = 0;
            //　获得对应小车的属性值
            for(let key in that.lorrys) {
                if(index == indx) {
                  that.indxObj = that.lorrys[key];
                  return;
                }
                index++;
            }

          });
          imgCar.addEventListener('mouseout', function() {
            that.panelView = '';
            that.isPanelView = false;
          });
        }
      }

    },
    mounted: function () {
      // 监听esriLoader是否存在，创建map
      if (!esriLoader.isLoaded()) {
        // no, lazy load it the ArcGIS API before using its classes
        esriLoader.bootstrap((err) => {
          if (err) {
            console.error(err);
          } else {
            // once it's loaded, create the map
            this.createMap();
          }
        }, {
          // use a specific version instead of latest 4.x
          url: 'https://js.arcgis.com/3.20/'
        });
      } else {
        // ArcGIS API is already loaded, just create the map
        this.createMap();
      }

      // 添加所有经纬度坐标
      let that = this;
      this.ref.on('value', function(snapshot) {
        that.lorrys = snapshot.val();

        that.location_lng = [];
        that.location_lat = [];

        for(let key in that.lorrys) {
          that.location_lng.push(that.lorrys[key].current_lng);
          that.location_lat.push(that.lorrys[key].current_lat);
        }

        that.createCar();// 监听数据改变事件，改变则重新渲染界面
      });

    },
    methods: {
      // 创建地图
      createMap: function () {
        esriLoader.dojoRequire(["esri/map", "dojo/domReady!"], (Map) => {
          this.map = new Map("map", {
            center: [114.223516, 30.481806],
            zoom: 10,
            logo: false,
            basemap: "osm"
          });
        });
      },
      // 缩放到中心图层
      centerZoom: function () {
        this.map.centerAndZoom([114.223516, 30.481806], 10);
      },

      // 显示当前坐标
      showCoordinates: function(e) {
        console.log(e.mapPoint.x)
      }

    }

  }
</script>
<style>
  @import url('https://js.arcgis.com/3.15/dijit/themes/tundra/tundra.css');
  @import url('https://js.arcgis.com/3.20/esri/css/esri.css');
  @import './../assets/css/overRall.css';

</style>
