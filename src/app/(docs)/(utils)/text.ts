export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncateText = (
  text: string | null,
  outputLength: number,
  separator?: string
) => {
  if (!text) return text

  if (text.length <= outputLength) return text

  separator = separator || "..."

  return text.substr(0, outputLength - separator.length) + separator
}
