import { routeConfig as Notice } from './Notice'
import { routeConfig as Branch } from './Branch'

const route = []

route.push(Notice)
route.push(Branch)

export default route.sort((a, b) => {
  return a.sort > b.sort
})
