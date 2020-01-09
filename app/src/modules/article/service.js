export const requestText = (params) => {
  return new Promise (resolve => {
    fetch(params)
      .then(res => res.text())
      .then(text => resolve(text))
  })
}

export const requestBlob = (params) => {
  return new Promise (resolve => {
    fetch(params)
      .then(res => res.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        resolve(objectURL)
      })
  })
}
