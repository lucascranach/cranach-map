const metaDataHeader = require('./components/meta-data-head.11ty');
const geoDataConverter = require('./components/geo-data.11ty.js');

exports.render = (data) => {

  const headerData = {
    content: {
      metadata: {
        "title": "Map"
      }
    }
  }

  const metaDataHead = metaDataHeader.getHeader(headerData);
  const geoData = geoDataConverter.getGeoData(this, data, "de");

  return `<!doctype html> 
  <html lang="">
    <head>
      <title>cda :: Map</title>
      ${metaDataHead}
      <link href="${this.url('/compiled-assets/main.css')}" rel="stylesheet">
      <script src='https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js'></script>
      <!--link href='https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css' rel='stylesheet' /-->

      <script>
        const geoData = ${JSON.stringify(geoData)};
      </script>
    </head>
    <body>
      <main data-js-on-load-action="fade-in">
        <div id="map" class="map"></div>
        <div class="info">
          ${data.content}
        </div>
      </main>
      <script src="${this.url('/assets/scripts/map.js')}"></script>
    </body>
  </html>`;
};


