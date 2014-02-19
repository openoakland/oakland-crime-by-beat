var ldjson = require('ldjson-stream')
var fs = require('fs')
var stdout = require('stdout')
var through = require('through')
var csvData = fs.createReadStream('crime.json')

var beats = {}

var beatSplitter = through(function(obj) {
  if (!(beats[obj.beat])) {
    beats[obj.beat] = JSON.parse(JSON.stringify(featureCollection))
  }
  var geojson = JSON.parse(JSON.stringify(feature))
  geojson.geometry.coordinates = [+obj.long, +obj.lat]
  geojson.properties = obj
  beats[obj.beat].features.push(geojson)
})

csvData.pipe(ldjson.parse({json: true})).pipe(beatSplitter).on('end', function() {
  Object.keys(beats).map(function(beat) {
    fs.writeFileSync('beats/' + beat + '.geojson', JSON.stringify(beats[beat]))
  })
})

var featureCollection = {
  "type": "FeatureCollection",
  "features": [
    
     ]
   }

var feature = { 
  "type": "Feature",
  "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
  "properties": {}
}