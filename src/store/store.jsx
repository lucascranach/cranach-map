import { atom } from "jotai"

export const mapDataAtom = atom()

// only used until loading is done
export const demoMapDataAtom = atom({
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.766667, 51.216667],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_SMKP_M206_FR376C/01_Overall/DE_SMKP_M206_FR376C_2011-09_Overall-s.jpg",
        title: "Christus am Ölberg",
        inventory_number: "DE_SMKP_M206",
        location: "Düsseldorf",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.766667, 51.216667],
      },
      properties: {
        img_src: "",
        title: "Buße des heiligen Johannes Chrysostomos",
        inventory_number: "LC_HVI-2_1",
        location: "Düsseldorf",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.766667, 51.216667],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_SMKP_M2248_FR287/01_Overall/DE_SMKP_M2248_FR287_2011-09_Overall-s.jpg",
        title: "Das ungleiche Paar",
        inventory_number: "DE_SMKP_M2248",
        location: "Düsseldorf",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.766667, 51.216667],
      },
      properties: {
        img_src: "",
        title: "Hl. Christophorus",
        inventory_number: "LC_HVI-56_79",
        location: "Düsseldorf",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.95, 50.933333],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_WRMK_WRM3207_FR089/01_Overall/DE_WRMK_WRM3207_FR089_2014-02_Overall-s.jpg",
        title: "Maria mit dem Kinde",
        inventory_number: "DE_WRMK_WRM3207",
        location: "Köln",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.95, 50.933333],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_WRMK_WRM3475_FR-none/01_Overall/DE_WRMK_WRM3475_FR-none_2014-02_Overall-s.jpg",
        title: "Gesetz und Gnade",
        inventory_number: "DE_WRMK_WRM3475",
        location: "Köln",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.95, 50.933333],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_WRMK_WRM390_FR168/01_Overall/DE_WRMK_WRM390_FR168_2014-02_Overall-s.jpg",
        title: "Die Heilige Maria Magdalena",
        inventory_number: "DE_WRMK_WRM390",
        location: "Köln",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.95, 50.933333],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_WRMK_WRM382_FR-none/01_Overall/DE_WRMK_WRM382_FR-none_2014-02_Overall-s.jpg",
        title:
          "Maria Kleophas mit Alphäus und Maria Salomas mit Zebedäus [zusammengefügte Flügel eines Triptychons]",
        inventory_number: "DE_WRMK_WRM382",
        location: "Köln",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.95, 50.933333],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_WRMK_WRM530_FR-none/01_Overall/DE_WRMK_WRM530_FR-none_2014-02_Overall-s.jpg",
        title: "Christus und die Ehebrecherin",
        inventory_number: "DE_WRMK_WRM530",
        location: "Köln",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [6.95, 50.933333],
      },
      properties: {
        img_src:
          "https://lucascranach.org/imageserver-2022/DE_WRMK_WRM874_FR329/01_Overall/DE_WRMK_WRM874_FR329_2014-02_Overall-s.jpg",
        title: "Bildnis eines Prinzen",
        inventory_number: "DE_WRMK_WRM874",
        location: "Köln",
      },
    },
  ],
})
