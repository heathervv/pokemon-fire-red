const copy = (string, showChoiceBubble) => ([string, showChoiceBubble])

const starterSnippets = [
  copy("I see! {{POKEMON_NAME}} is your choice. It's very easy to raise.", false),
  copy("Hm! {{POKEMON_NAME}} is your choice. It's one worth raising.", false),
  copy("Ah! {{POKEMON_NAME}} is your choice. You should raise it patiently.", false)
]

const starterConfirm = copy("So, you're claiming the {{POKEMON_TYPE}} POKéMON {{POKEMON_NAME}}?", true)

const starterChosen = copy("This POKéMON is really quite energetic!", false)
const starterCelebrated = copy("You received the {{POKEMON_NAME}} from PROF. OAK!", false)

const choosingStarters = (index = 0) => ({
  0: starterSnippets[index],
  1: starterConfirm,
  2: starterChosen,
  3: starterCelebrated
})

export {
  choosingStarters
}
