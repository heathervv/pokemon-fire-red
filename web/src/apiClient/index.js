const theRequestFailed = (status) => {
  if (status >= 400 && status <= 500) {
    return true
  }

  return false
}

const getStarters = async () => {
  return await fetch('api/pokemon/starter')
    .then(data => data.json())
    .then((response) => {
      if (theRequestFailed(response.status)) return []

      return response
    })
}

const chooseStarter = async (pokemon) => {
  return await fetch('api/pokemon/starter', {
    method: 'POST',
    body: JSON.stringify(pokemon)
  })
    .then(data => data.json())
    .then((response) => {
      if (theRequestFailed(response.status)) return []

      return response
    })
}

export {
  getStarters,
  chooseStarter
}
