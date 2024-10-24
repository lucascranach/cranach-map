export const colors = {
  medium: "#666",
  dark: "#444",
  darker: "#222",
  darkest: "#000",
  light: "#b4b4b4",
  lighter: "#f2f2f2",
  lightest: "#fff",
  lighten: "rgba(255, 255, 255, 0.1)",
  lightenStrong: "rgba(255, 255, 255, 0.2)",
  lightenStrongest: "rgba(255, 255, 255, 0.8)",
  accent: "#FEB701", // fc0
  decoration: "#cc5800",
  error: "#c00",
  darken: "rgba(0, 0, 0, 0.04)",
  darkenMedium: "rgba(0, 0, 0, 0.1)",
  darkenStrong: "rgba(0, 0, 0, 0.2)",
  darkenStrongest: "rgba(0, 0, 0, 0.8)",
}

export const viewports = {
  vpMedium: "720px",
  vpLarge: "1024px",
  vpXLarge: "1400px",
  vpXXLarge: "1700px",
  vp3XLarge: "2000px",
  vp4XLarge: "2300px",
}
// Base font size
const bfs = 0.9 // rem

// Sizes along the Fibonacci sequence
export const sizes = {
  xxxs: bfs * 0.2 + "rem",
  xxs: bfs * 0.3 + "rem",
  xs: bfs * 0.5 + "rem",
  s: bfs * 0.8 + "rem",
  m: bfs * 1.3 + "rem",
  l: bfs * 2.1 + "rem",
  xl: bfs * 3.4 + "rem",
  xxl: bfs * 5.5 + "rem",
  half: bfs / 2 + "rem",
  quad: bfs / 4 + "rem",
}

// Fonts
export const fonts = {
  sansSerif: '"IBMPlexSans", sans-serif',
  icons: "'Material Icons'",
  code: 'menlo, consolas, "Courier New", courier, "Liberation Mono", monospace',
}

// Font weights
export const fontWeights = {
  light: 200,
  regular: 300,
  semiBold: 400,
  bold: 600,
}

// Line heights
export const lineHeights = {
  tight: "120%",
  normal: "140%",
  loose: "160%",
  headlines: "120%", // same as tight
}

// Animations (along the Fibonacci sequence)
export const transitions = {
  slow: "0.8s",
  medium: "0.5s",
  fast: "0.2s",
  faster: "0.1s",
}

// Tiles
export const tiles = {
  xxs: "8em",
  xs: "12em",
  s: "16em",
}

// Levels (z-index)
export const levels = {
  background: 0,
  content: 10,
  contentNav: 20,
  sectionNav: 30,
  overallNav: 40,
}

// Shadows
export const shadows = {
  color: "rgba(0, 0, 0, 0.4)",
  colorLighter: "rgba(0, 0, 0, 0.2)",
  shadow: `1px 1px ${sizes.xxs} rgba(0, 0, 0, 0.4)`,
  shadowXs: `1px 1px ${sizes.xxxs} rgba(0, 0, 0, 0.4)`,
  shadowS: `1px 1px ${sizes.s} rgba(0, 0, 0, 0.4)`,
  shadowM: `1px 1px ${sizes.m} rgba(0, 0, 0, 0.4)`,
  shadowTop: `0 0 ${sizes.xxs} rgba(0, 0, 0, 0.4)`,
  shadowTopS: `0 0 ${sizes.s} rgba(0, 0, 0, 0.4)`,
  shadowTopM: `0 0 ${sizes.m} rgba(0, 0, 0, 0.4)`,
}

// Misc
export const misc = {
  borderStrokeWeight: "2px",
  borderStrokeWeightS: "1px",
  borderStrokeWeightM: "3px",
  borderRadius: "2px",
  innerShadow: `inset 0 0 ${sizes.s} rgba(0, 0, 0, 0.1)`,
  opFull: 1,
  opMedium: 0.6,
  opLow: 0.3,
  sidebarWidth: bfs * 28 + "rem",
  sliderHandles: sizes.m,
}

// Custom Properties
export const customProperties = {
  tileFix: "120px",
}
