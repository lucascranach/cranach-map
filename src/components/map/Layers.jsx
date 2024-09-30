export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "paintings",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#fc0",
      100,
      "#e8a60c",
      750,
      "#e8a60c",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
}

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "paintings",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
}

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "paintings",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#fc0",
    "circle-radius": 8,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
}
