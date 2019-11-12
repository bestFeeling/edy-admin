import { routeConfig as Notice } from './Notice'
import { routeConfig as Branch } from './Branch'
import { routeConfig as Test   } from './Test'
import { routeConfig as Admin   } from './Admin'

const route = []

route.push(Notice)
route.push(Branch)
// route.push(Test)
route.push(Admin)

export default route.sort((a, b) => {
  return a.sort > b.sort
})
