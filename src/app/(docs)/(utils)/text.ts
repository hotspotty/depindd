export function slugToTitle(str: string): string {
  const newString = str.replaceAll("-", " ")
  return newString.charAt(0).toUpperCase() + newString.slice(1)
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
