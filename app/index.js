import 'whatwg-fetch';
import Vue from 'vue/dist/vue';

const app = new Vue({
  el: '.app',

  mounted() {
    this.searchSeries('Hulk');
  },

  methods: {
    searchSeries(series) {
      fetch('http://gateway.marvel.com/v1/public/series?limit=1&titleStartsWith=series&apikey=3d82878db752f59c47fdf37c7b4058f1')
            .then((r) => r.json())
            .then((data) => {
              this.seriesData = data;
            });
    },
  },
});
