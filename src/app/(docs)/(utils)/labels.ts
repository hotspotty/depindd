import Color from "color"

export const getLabelColorStyle = (
  colorString: string,
  isDark: boolean
): React.CSSProperties => {
  let color = Color("green") // This is just in case a non-valid color string is passed

  try {
    color = Color(colorString)
  } catch (e) {
    console.error(e)
  }

  const [r, g, b] = color.rgb().array()
  const [h, s, l] = color.hsl().array()

  const perceivedLightness = `calc(${r}*0.2126/255 + ${g}*0.7152/255 + ${b}*0.0722/255)`

  if (isDark) {
    const lightnessThreshold = 0.6
    const backgroundAlpha = 0.05
    const borderAlpha = 0.3
    const lightnessSwitch = `max(0,min(calc(${perceivedLightness}*-1000 - ${lightnessThreshold}*-1000),1))`
    const lightenBy = `calc((${lightnessThreshold}*100 - ${perceivedLightness}*100)*${lightnessSwitch})`

    return {
      background: `rgba(${r},${g},${b},${backgroundAlpha})`,
      borderColor: `hsla(${h},calc(${s}*1%),calc((${l} + ${lightenBy})*1%),${borderAlpha})`,
      color: `hsl(${h},calc(${s}*1%),calc((${l} + ${lightenBy})*1%))`,
    }
  }

  const lightnessThreshold = 0.453
  const borderThreshold = 0.96
  const lightnessSwitch = `max(0,min(calc(${perceivedLightness}*-1000 - ${lightnessThreshold}*-1000),1))`
  const borderAlpha = `max(0,min(calc(${perceivedLightness}*100 - ${borderThreshold}*100),1))`

  return {
    background: `rgb(${r},${g},${b})`,
    borderColor: `hsla(${h},calc(${s}*1%),calc((${l} - 25)*1%),${borderAlpha})`,
    color: `hsl(0,0%,calc(${lightnessSwitch}*100%))`,
  }
}

export const labelColors = [
  "#d73aaa",
  "#0075ca",
  "#cfd3d7",
  "#a2eeef",
  "#0052cc",
  "#7057ff",
  "#008672",
  "#e4e669",
  "#d876e3",
  "#ffffff",
]

const generateNumberFromString = (str: string) =>
  Array.from(Array(str.length).keys()).reduce(
    (sum: number, index: number) => sum + str.charCodeAt(index),
    0
  )

export const getColorFromId = (id: string): string => {
  const colorIndex = generateNumberFromString(id) % labelColors.length
  return labelColors[colorIndex]
}
