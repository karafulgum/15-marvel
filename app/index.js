import 'whatwg-fetch';
import Vue from 'vue/dist/vue';

const apikey = '3d82878db752f59c47fdf37c7b4058f1';

const app = new Vue({
  el: '.app',

  data() {
    return {
      seriesData: null,
      characters: null,
      comics: null,
      modalDescription: false,
      searchTerm: '',
    };
  },

  mounted() {
    this.searchSeries('deadpool');
  },

  methods: {
    showDescription(description) {
      this.modalDescription = description;
    },

    hideModal() {
      this.modalDescription = null;
    },

    searchSeries(series) {
      fetch(`http://gateway.marvel.com/v1/public/series?limit=1&titleStartsWith=${series}&apikey=${apikey}`)
            .then((r) => r.json())
            .then((data) => {
              this.seriesData = data.data.results[0];
              this.searchCharacters(this.seriesData.id);
              this.searchComics(this.seriesData.id);
            });
    },
    searchCharacters(id) {
      fetch(`http://gateway.marvel.com/v1/public/series/${id}/characters?apikey=${apikey}`)
        .then((r) => r.json())
        .then((data) => {
          this.characters = data.data.results;
        });
    },
    searchComics(id) {
      fetch(`http://gateway.marvel.com/v1/public/series/${id}/comics?apikey=${apikey}`)
      .then((r) => r.json())
      .then((data) => {
        this.comics = data.data.results;
      });
    },
  },
});
