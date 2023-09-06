export function generateSetId(inputString) {
  const parts = inputString
    .split(/(\d+|[a-zA-Z]+)/)
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part)) {
        const number = parseInt(part, 10)
        return number < 10 ? `0${number}` : part
      }
      return part
    })

  if (parts.length >= 2) {
    parts.splice(0, 2, parts.slice(0, 2).join('')) // Change '-' to ''
  }

  return parts[0]
}
