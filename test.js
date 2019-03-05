const mod = require('./get_song_meaning');

mod.search('Middle Child').then(response => {
    console.log(response.response.hits[0].result.full_title)
});