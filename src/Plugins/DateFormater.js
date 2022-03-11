module.exports.FormattingDate = date => {
  const temp = new Date(date)
  const day = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()
  const month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1
  return `${day}-${month}-${temp.getFullYear()}`
}
module.exports.IsoFormattingDate = isoDate => {
  const day = isoDate.getDate() < 10 ? '0' + isoDate.getDate() : isoDate.getDate()
  const month = isoDate.getMonth() + 1 < 10 ? '0' + (isoDate.getMonth() + 1) : isoDate.getMonth() + 1
  const year = isoDate.getFullYear()
  return `${year}-${month}-${day}`
}

module.exports.InputDate = date => {
  const temp = new Date(date)
  const day = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()
  const month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1
  const year = temp.getFullYear()
  return `${year}-${month}-${day}`
}
