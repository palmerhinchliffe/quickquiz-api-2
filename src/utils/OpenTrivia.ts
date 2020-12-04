class OpenTrivia {
  constructor() {
    
  }
  
  createCategorySlug = str => {
  str = str.trim()
  str = str.toLowerCase()

  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;"
  const to = "aaaaaaeeeeiiiioooouuuunc------"

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  return str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, "") // trim - from end of text
    .replace(/-/g, '-')
  }

  stringifyResponseCode = responseCode => {
    let message = 'OpenTrivia API - '
    switch (responseCode) {
      case 1:
        return message += 'No results'
        break
      case 2:
        return message += 'Invalid parameter'
        break
      case 3:
        return message += 'Session token not found'
        break
      case 4:
        return message += 'Session Token has returned all possible questions for the specified query'
        break
    }
  }

}

module.exports = OpenTrivia