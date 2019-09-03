const starterSnippets = [
  ["I see! {{POKEMON_NAME}} is your choice. It's very easy to raise.", false],
  ["Hm! {{POKEMON_NAME}} is your choice. It's one worth raising.", false],
  ["Ah! {{POKEMON_NAME}} is your choice. You should raise it patiently.", false]
]

const starterConfirm = ["So, you're claiming the {{POKEMON_TYPE}} POKéMON {{POKEMON_NAME}}?", true]

const choosingStarters = (index = 0) => ({
  0: starterSnippets[index],
  1: starterConfirm
})

export {
  choosingStarters
}
