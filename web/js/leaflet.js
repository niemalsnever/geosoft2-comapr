"use strict";
var textcoords = [];
var coords =[];
var mymap = L.map('mapid').setView([51.9606649, 7.6161347], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'hoelsch.e2b0812b',
    accessToken: 'pk.eyJ1IjoiaG9lbHNjaCIsImEiOiJxblpwakZrIn0.JTTnLszkIJB11k8YEe7raQ'
}).addTo(mymap);
var drawnItems = new L.FeatureGroup();


mymap.addLayer(drawnItems);



mymap.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
}));

mymap.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    drawnItems.addLayer(layer);
});

mymap.on('draw:created', function (e) {
    // When a user finishes editing a shape we get that information here
    var coords = drawnItems.toGeoJSON();

    for (var i= 0; i< coords.features[0].geometry.coordinates.length;i++)
    {

        for(var j=1; j<coords.features[0].geometry.coordinates[0].length;j++)
        {
            console.log(coords.features[0].geometry.coordinates[i][j]);
            textcoords.push(JSON.stringify(coords.features[0].geometry.coordinates[i][j]));

        }
    }

    editor.replaceRange(textcoords, CodeMirror.Pos(editor.lastLine()));
    //
    // document.getElementById("coordinates") = JSON.stringify(drawnItems.toGeoJSON()
});

