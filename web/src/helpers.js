const replaceString = (copy, replacements) => {
  let finalString = copy

  for (let i = 0; i < replacements.length; i += 1) {
    const toBeReplaced = new RegExp(replacements[i].a, 'g')
    const toBeAdded = replacements[i].b

    if (toBeReplaced && toBeAdded) finalString = finalString.replace(toBeReplaced, toBeAdded.toUpperCase())
  }

  return finalString
}

const isOdd = (n) => (n % 2 === 0)

const isEven = (n) => (Math.abs(n % 2) === 1)

export {
  replaceString,
  isOdd,
  isEven
}
