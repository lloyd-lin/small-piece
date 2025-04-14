const mystr = '${game} is so ${adj}!'
const data = {
  game: 'kancolle',
  adj: 'interesting'
}
function templateTransfer(str, data) {
  return str.replace(/\$\{[\w]+\}/g, (match, index) => {
    return data[match.slice(2, match.length -1)];
  })
}

console.log(templateTransfer(mystr, data))