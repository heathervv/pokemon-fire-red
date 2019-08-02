const getStarters = async () => {
  return await fetch('api/pokemon/starter')
    .then(data => data.json())
    .then((response) => response)
    .catch((error) => {
      throw error
    })
}

export {
  getStarters
}
