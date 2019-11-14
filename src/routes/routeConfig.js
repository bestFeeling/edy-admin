import { routeConfig as Notice } from './Notice'
import { routeConfig as Branch } from './Branch'
import { routeConfig as BisSerive } from './BisService'
import { routeConfig as User } from './User'

const route = []

route.push(Notice)
route.push(Branch)
route.push(BisSerive)
route.push(User)

export default route.sort((a, b) => {
  return a.sort > b.sort
})
