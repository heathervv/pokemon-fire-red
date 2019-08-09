const starterSnippets = [
  "I see! {{POKEMON_NAME}} is your choice. It's very easy to raise.",
  "Hm! {{POKEMON_NAME}} is your choice. It's one worth raising.",
  "Ah! {{POKEMON_NAME}} is your choice. You should raise it patiently."
]

const starterConfirm = "So, you're claiming the {{POKEMON_TYPE}} POKéMON {{POKEMON_NAME}}?"

const choosingStarters = (index) => ({
  0: starterSnippets[index],
  1: starterConfirm
})

export {
  choosingStarters
}
