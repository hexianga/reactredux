export const requestText = (params) => new Promise(resolve => {
  fetch(params)
    .then(res => res.text())
    .then(text => resolve(text))
})

export const requestBlob = (params) => new Promise(resolve => {
  fetch(params)
    .then(res => res.blob())
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      resolve(objectURL)
    })
})
