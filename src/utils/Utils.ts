export const createCategorySlug = str => {
  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;"
  const to = "aaaaaaeeeeiiiioooouuuunc------"

  str = str.trim().toLowerCase()

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  return str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace with -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, "") // trim - from end of text
    .replace(/-/g, '-')
}

export const stringifyResponseCode = responseCode => {
  switch (responseCode) {
    case 1:
      return 'No results'
      break
    case 2:
      return 'Invalid parameter'
      break
    case 3:
      return 'Session token not found'
      break
    case 4:
      return 'Session Token has returned all possible questions for the specified query'
      break
    default:
      return 'Unknown error'
  }
}
