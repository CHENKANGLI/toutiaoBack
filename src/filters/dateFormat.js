export const dateFormat = (time, spe) => {
  spe = spe || '-'
  let year = time.substr(0, 4)
  let month = time.substr(5, 2)
  let day = time.substr(8, 2)
  return `${year}${spe}${month}${spe}${day}`
}
