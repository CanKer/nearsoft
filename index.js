const holi = (done) =>  {
  done("hola")
}

console.log("hey")

holi((cb) => {
  console.log("cb: ", cb)
})
