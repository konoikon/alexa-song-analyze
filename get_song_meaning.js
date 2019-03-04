const api = require('node-genius');

const GENIUS_CLIENT_ACCESS_TOKEN = "RvX2l6c-PHETo3i7x_QDF_hH9AzfSjHdBk3iFmG7U7NZtOdo4iPds44xXH_dXvq1";
const geniusClient = new api(GENIUS_CLIENT_ACCESS_TOKEN);

const song = "Bodak Yellow";
var str = "";

geniusClient.search(song, function (error, results) {
    if (error) {
        throw new Error("Error in search");
    } else {
        result = JSON.parse(results);
        song_id = (result.response.hits[0].result.api_path).substring(7);
        geniusClient.getSong(song_id, function (error, results) {
            if (error) {
                throw new Error("Error in getSong");
            } else {
                annotations = JSON.parse(results).response.song.description.dom.children;
                annotations.forEach(element => {
                    console.log(element);
                });
            }
        });
    }
});

function findValues(node) {
    if (node.children === undefined) {
        str += node;
    } else {
        for (var i=0; i<node.length; i++) {
            console.log(i);
            findValues(node[i]);
        }
    }
}