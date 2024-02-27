interface PARAMS {
  [key: string]: string | string[]
}

export const COLORS: PARAMS = {
  black: "#000",
  white: "#fff",
}

export const SIZE = {
  xss: "360",
  xs: "767",
  md: "1024",
  lg: "1440",
  xl: "2000",
}

export const DEVICE = {
  xs: `(min-width: ${SIZE.xs}px)`,
  md: `(min-width: ${SIZE.md}px)`,
  lg: `(min-width: ${SIZE.lg}px)`,
  xl: `(min-width: ${SIZE.xl}px)`,

  maxxss: `(max-width: ${SIZE.xss}px)`,
  maxxs: `(max-width: ${SIZE.xs}px)`,
  maxmd: `(max-width: ${SIZE.md}px)`,
  maxlg: `(max-width: ${SIZE.lg}px)`,
  maxxl: `(max-width: ${SIZE.xl}px)`,
}
