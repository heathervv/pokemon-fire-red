const getStarters = async () => {
  return await fetch('api/pokemon/starter')
    .then(data => data.json())
    .then((response) => response)
    .catch((error) => {
      throw error
    })
}

const chooseStarter = async (pokemon) => {
  return await fetch('api/pokemon/starter', {
    method: 'POST',
    body: JSON.stringify(pokemon)
  })
    .then(data => data.json())
    .then((response) => response)
    .catch((error) => {
      throw error
    })
}

export {
  getStarters,
  chooseStarter
}
