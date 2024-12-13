export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "paintings",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#ff0000", // Color when hovered
      ["step", ["get", "point_count"], "#fc0", 100, "#e8a60c", 750, "#b5830f"],
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 75, 30, 500, 40],
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
    "circle-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#ff0000", // Color when hovered
      "#fc0", // Default color
    ],
    "circle-radius": 8,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
}
