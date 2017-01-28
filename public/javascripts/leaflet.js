"use strict";

var coordinates = [];
//.fromTextArea(document.getElementById("output"), {});
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
        },
        circle: false

    }
}));

mymap.on('draw:created', function(e) {
    var type = e.layerType;
    var layer = e.layer;

    logCoords(type, layer); //invokes a superfluous debug function, which also is broken

    drawnItems.addLayer(layer);
    editor.replaceRange("#" + JSON.stringify(layer.toGeoJSON()) + "\n", {
        line: Infinity
    });
});


/**
 * This is an unneccessary DEBUG function and needs to be removed!
 * TODO!
 * @param type
 * @param layer
 */
function logCoords(type, layer) {
    var geojson = {};
    var latlngs;

    if (type === 'polygon') {
        // structure the geojson object

        geojson['type'] = 'Feature';
        geojson['geometry'] = {};
        geojson['geometry']['type'] = "Polygon";

        // export the coordinates from the layer
        coordinates = [];
        latlngs = layer.getLatLngs();
        console.log(latlngs);
        for (i = 0; i < latlngs.length; i++) {
            coordinates.push([latlngs[i].lng, latlngs[i].lat])
        }

        // push the coordinates to the json geometry
        geojson['geometry']['coordinates'] = [coordinates];

        // Finally, show the poly as a geojson object in the console

        console.log(JSON.stringify(layer.toGeoJSON()));
        // document.textarea.coordinates.value = Json.stringify(layer.toGeoJSON());

        //skip duplicates
        for (i = 0; i < latlngs[0].length; i++) {

            if (latlngs[0][i] === latlngs[0][i++]) {

            }

            console.log("punkt " + latlngs[0][i]);
        }
        drawnItems.addLayer(layer);

    }

    if (type === 'marker') {
        geojson['type'] = 'Feature';
        geojson['geometry'] = {};
        geojson['geometry']['coordinates'] = [coordinates];
        //var latlngs = layer.getLatLngs();
        console.log(JSON.stringify(layer.getLatLng()));
        drawnItems.addLayer(layer);

    }

    if (type === 'rectangle') {
        // structure the geojson object
        geojson['type'] = 'Feature';
        geojson['geometry'] = {};

        // export the coordinates from the layer

        latlngs = layer.getLatLngs();
        for (i = 0; i < latlngs.length; i++) {
            coordinates.push([latlngs[i].lng, latlngs[i].lat])
        }

        // push the coordinates to the json geometry
        geojson['geometry']['coordinates'] = [coordinates];

        // show the polygon as a geojson object in the console
        console.log(JSON.stringify(layer.toGeoJSON()));

        //skip duplicates
        for (i = 0; i < latlngs[0].length; i++) {
            if (latlngs[0][i] === latlngs[0][4]) {
                i = latlngs[0].length;
            }
            console.log(i + 1 + ". " + "punkt " + latlngs[0][i]);
        }
        drawnItems.addLayer(layer);

    }
    if (type === 'polyline') {
        // structure the geojson object
        geojson['type'] = 'Feature';
        geojson['geometry'] = {};

        // export the coordinates from the layer
        coordinates = [];
        latlngs = layer.getLatLngs();
        for (var i = 0; i < latlngs.length; i++) {
            coordinates.push([latlngs[i].lng, latlngs[i].lat])
        }

        // push the coordinates to the json geometry
        geojson['geometry']['coordinates'] = [coordinates];

        // Finally, show the poly as a geojson object in the console
        // console.log(JSON.stringify(geojson));

        //skip duplicates
        for (i = 0; i < latlngs.length; i = i + 2) {
            if (latlngs[i] === latlngs[i + 1]) {
                // console.log(latlngs[i].lng , latlngs[i].lat);
                if (i === 'undefined') {
                    i = i + 2;
                } else {
                    i = i + 2;
                }

            }
            console.log("punkt " + latlngs[i]);

        }
        drawnItems.addLayer(layer);

    }
}
//