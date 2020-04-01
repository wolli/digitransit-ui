/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'hb';
const APP_TITLE = 'stadtnavi';
const APP_DESCRIPTION = '';
const API_URL = process.env.API_URL || 'https://api.stadtnavi.de';
const MAP_URL = process.env.MAP_URL || 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const SEMI_TRANSPARENT_MAP_URL = process.env.SEMI_TRANSPARENT_MAP_URL || 'https://api.maptiler.com/maps/ffa4d49e-c68c-46c8-ab3f-60543337cecb/256/{z}/{x}/{y}.png?key=eA0drARBA1uPzLR6StGD';
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || `https://pelias.locationiq.org/v1`;
const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
  process.env.STATIC_MESSAGE_URL ||
  '/assets/messages/message.hb.json';

const walttiConfig = require('./waltti').default;

const minLat = 48.55525;
const maxLat = 48.64040;
const minLon = 8.78597;
const maxLon = 8.98613;

export default configMerger(walttiConfig, {
  CONFIG,
  URL: {
    OTP: process.env.OTP_URL || `${API_URL}/routing/v1/router/`,
    MAP: {
      default: MAP_URL,
      satellite: `${API_URL}/tiles/orthophoto/{z}/{x}/{y}.jpg`,
      semiTransparent: SEMI_TRANSPARENT_MAP_URL,
      bicycle: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    },
    STOP_MAP: `${API_URL}/map/v1/stop-map/`,
    DYNAMICPARKINGLOTS_MAP: `${API_URL}/map/v1/hb-parking-map/`,
    ROADWORKS_MAP: `${API_URL}/map/v1/roadworks-bw-map/`,

    PELIAS: `${GEOCODING_BASE_URL}/search${LOCATIONIQ_API_KEY ? '?api_key=' + LOCATIONIQ_API_KEY : ''}`,
    PELIAS_REVERSE_GEOCODER: `${GEOCODING_BASE_URL}/reverse${LOCATIONIQ_API_KEY ? '?api_key=' + LOCATIONIQ_API_KEY : ''}`,
  },

  availableLanguages: ['de', 'en'],
  defaultLanguage: 'de',

  MATOMO_URL: process.env.MATOMO_URL,

  defaultSettings: {
    optimize: "GREENWAYS",
  },

  appBarLink: {
    name: 'Feedback',
    href: 'https://www.stadtnavi.de/feedback',
    target: '_blank'
  },

  contactName: {
    de: 'transportkollektiv',
    default: 'transportkollektiv',
  },

  colors: {
    primary: '#9fc727',
  },

  sprites: 'assets/svg-sprite.hb.svg',

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,

    image: {
      url: '/img/stadtnavi-social-media-card.png',
      width: 600,
      height: 300,
    },

    twitter: {
      card: 'summary_large_image',
      site: '@TUGHerrenberg',
    },
  },

  dynamicParkingLots: {
    showDynamicParkingLots: true,
    dynamicParkingLotsSmallIconZoom: 14,
    dynamicParkingLotsMinZoom: 14
  },

  roadworks: {
    showRoadworks: true,
    roadworksSmallIconZoom: 16,
    roadworksMinZoom: 10
  },

  mergeStopsByCode: true,

  title: APP_TITLE,

  favicon: './app/configurations/images/hb/favicon.png',

  meta: {
    description: APP_DESCRIPTION,
  },

  modeToOTP: {
    carpool: 'CARPOOL',
  },

  logo: 'hb/stadtnavi-logo.svg',

  GTMid: '',

  timezoneData: 'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o 00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5',

  map: {
    useRetinaTiles: true,
    tileSize: 256,
    zoomOffset: 0,
    attribution: {
      'default': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href="https://www.maptiler.com/copyright/">Maptiler</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
      'satellite': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href="https://www.lgl-bw.de/">LGL BW</a>, © <a tabindex=-1 href=https://www.cyclosm.org/#map=12/52.3728/4.8936/cyclosmx>CyclOSM</a> & © <a tabindex=-1 href="https://www.openstreetmap.fr/">OSM-FR</a>, © <a tabindex=-1 href="https://www.maptiler.com/copyright/">Maptiler</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
      'bicycle': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href=https://www.cyclosm.org/#map=12/52.3728/4.8936/cyclosmx>CyclOSM</a>, © <a tabindex=-1 href="https://www.openstreetmap.fr/">OSM-FR</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
    },
  },

  feedIds: ['hb'],
  searchSources: ['oa', 'osm'],

  searchParams: {
    'boundary.rect.min_lat': 48.4521,
    'boundary.rect.max_lat': 48.85,
    'boundary.rect.min_lon': 8.5,
    'boundary.rect.max_lon': 9.2780,
  },

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
  ],

  nationalServiceLink: { name: 'Fahrplanauskunft efa-bw', href: 'https://www.efa-bw.de' },

  defaultEndpoint: {
    address: 'ZOB Herrenberg',
    lat: 48.5942066,
    lon: 8.8644041,
  },

  defaultOrigins: [
    {
      icon: 'icon-icon_bus',
      label: 'ZOB Herrenberg',
      lat: 48.5942066,
      lon: 8.8644041,
    },
    {
      icon: 'icon-icon_star',
      label: 'Krankenhaus',
      lat: 48.59174,
      lon: 8.87536,
    },
    {
      icon: 'icon-icon_star',
      label: 'Waldfriedhof / Schönbuchturm',
      lat: 48.6020352,
      lon: 8.9036348,
    },
  ],

  footer: {
    content: [
      { label: `© Stadt Herrenberg ${YEAR}` },
      {},
      {
        name: 'about-this-service',
        nameEn: 'About this service',
        route: '/dieser-dienst',
        icon: 'icon-icon_info',
      },
      {
        name: 'imprint',
        nameEn: 'Imprint',
        href: 'https://www.herrenberg.de/impressum',
      },
      {
        name: 'privacy',
        nameEn: 'Privacy',
        href: 'https://www.herrenberg.de/datenschutz',
      },
    ],
  },

  aboutThisService: {
    de: [
      {
        header: 'Über diesen Dienst',
        paragraphs: [
          'Stadtnavi ist eine Reiseplannungs-Anwendung für die Region Herrenberg. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, PKW-Routing (inklusive Park & Ride) und Fahrgemeinschaften.',
          'Gefördert durch <br>',
          '<a href="https://www.herrenberg.de/stadtluft"><img src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',

        ],
      },
      {
        header: 'Digitransit Plattform',
        paragraphs: [
          'Dieser Dienst basiert auf der Digitransit Platform und dem Backend-Dienst OpenTripPlanner. Alle Software ist unter einer offenen Lizenzen verfügbar. Vielen Dank an alle Beteiligten.',        ],
      },
      {
        header: 'Datenquellen',
        paragraphs: [
          'Kartendaten: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
          'ÖPNV-Daten: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> und der <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
          'Alle Angaben ohne Gewähr.'
        ],
      },
    ],
    en: [
      {
        header: 'About this service',
        paragraphs: [
          'Stadtnavi is provided by the city of Herrenberg for route planning in Herrenberg region. The service covers public transport, walking, cycling, private car use and carpooling. Service is built on Digitransit platform and OpenTripPlanner.',
          '<a href="https://www.herrenberg.de/stadtluft"><img src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',
        ],
      },
      {
        header: 'Digitransit platform',
        paragraphs: [
          'The Digitransit service platform is an open source routing platform developed by HSL and Traficom. It builds on OpenTripPlanner by Conveyal. Enhancements by Transportkollektiv and MITFAHR|DE|ZENTRALE. All software is open source. Thanks to everybody working on this!',
        ],
      },
      {
        header: 'Data sources',
        paragraphs: [
          'Map data: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap contributors</a>',
          'Public transit data: Datasets by <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> and <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) enhanced with OpenStreetMap data © OpenStreetMap contributors',
          'No responsibility is accepted for the accuracy of this information.'
        ],
      },
    ],
  },

  redirectReittiopasParams: false,

  themeMap: {
    hb: 'hb',
  },

  transportModes: {
    rail: {
      availableForSelection: true,
      defaultValue: true,
    },

    tram: {
      availableForSelection: false,
      defaultValue: false,
    },

    subway: {
      availableForSelection: true,
      defaultValue: true,
    },

    citybike: {
      availableForSelection: false,
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: false,
      defaultValue: false,
    },

    carpool: {
      availableForSelection: true,
      defaultValue: false,
    },
  },

  streetModes: {
    public_transport: {
      availableForSelection: true,
      defaultValue: true,
      exclusive: false,
      icon: 'bus-withoutBox',
    },

    walk: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: true,
      icon: 'walk',
    },

    bicycle: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: true,
      icon: 'bicycle-withoutBox',
    },

    car: {
      availableForSelection: false,
      defaultValue: false,
      exclusive: false,
      icon: 'car-withoutBox',
    },

    car_park: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: false,
      icon: 'car-withoutBox',
    },

    carpool: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: true,
      icon: 'carpool-withoutBox',
    },
  },

  // adding assets/geoJson/hb-layers layers
  geoJson: {
    layers: [
      {
        name: {
          fi: '',
          en: 'Bicycle parkings',
          de: 'Fahrrad-Abstellanlagen',
        },
        url: '/assets/geojson/hb-layers/bicycle-parking.geojson',
      },
      // bicycleinfrastructure includes shops, repair stations,
      {
        name: {
          fi: '',
          en: 'Bicycle infrastructure',
          de: "Rund um's Fahrrad",
        },
        url: '/assets/geojson/hb-layers/bicycleinfrastructure.geojson',
      },
      // sharing options
      {
        name: {
          fi: '',
          en: 'Taxi & Sharing',
          de: 'Taxi & Sharing-Angebot',
        },
        url: '/assets/geojson/hb-layers/taxi-and-sharing.geojson',
      },
      // Charging stations
      {
        name: {
          fi: '',
          en: 'Charging stations',
          de: 'Ladestationen',
        },
        url: '/assets/geojson/hb-layers/charging.geojson',
      },
    ],
},
staticMessagesUrl: STATIC_MESSAGE_URL,

});
