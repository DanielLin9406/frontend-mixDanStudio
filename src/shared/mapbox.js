import mapboxgl from 'mapbox-gl';

const location_info = {
  type: 'markerLocation',
  features: [
    {
      type: 'Feature',
      properties: {
        title: 'San Blas Islands',
        imageUrl:
          'https://c1.staticflickr.com/5/4241/35467523155_346b08810f_q.jpg',
        type: 'beach',
        iconSize: [60, 60]
      },
      geometry: {
        type: 'Point',
        coordinates: [121.564, 25.03421]
      }
    },
    {
      type: 'Feature',
      properties: {
        title: 'San Blas Islands',
        imageUrl:
          'https://c1.staticflickr.com/5/4241/35467523155_346b08810f_q.jpg',
        type: 'beach',
        iconSize: [60, 60]
      },
      geometry: {
        type: 'Point',
        coordinates: [121.569, 25.039]
      }
    }
  ]
};

function initMap({ map, mapboxgl }) {
  map.on('load', function() {
    const bounds = new mapboxgl.LngLatBounds();
    location_info.features.forEach((e, i) => {
      bounds.extend(e.geometry.coordinates);
    });

    // Insert the layer beneath any symbol layer.
    let layers = map.getStyle().layers;

    let labelLayerId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id;
        break;
      }
    }

    map.addLayer(
      {
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 13,
        paint: {
          'fill-extrusion-color': '#aaa',

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      },
      labelLayerId
    );

    setTimeout(() => {
      map.fitBounds(bounds, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        easing(t) {
          return t * (2 - t);
        }
      });
    }, 300);
  });
}

export default mapboxgl;
export { initMap };
