import { routeConfig as Notice } from './Notice'
import { routeConfig as Branch } from './Branch'
import { routeConfig as Test   } from './Test'

const route = []

route.push(Notice)
route.push(Branch)
// route.push(Test)

export default route.sort((a, b) => {
  return a.sort > b.sort
})
