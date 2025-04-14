const handleRes = async () => {
  return new Promise((resolve, reject) => {
    // resolve(OtherPromise())
    return OtherPromise()
  })
}

const OtherPromise = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}
handleRes().then(res => {
  console.log('end', res)
})


// const nullPromise = new Promise((resolve, reject))