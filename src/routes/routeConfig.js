import { routeConfig as Notice } from './Notice'
import { routeConfig as Branch } from './Branch'
import { routeConfig as BisSerive } from './BisService'
import { routeConfig as User } from './User'
import { routeConfig as Test } from './Test'
import { routeConfig as Admin } from './Admin'
import { routeConfig as Category } from './Category'
import { routeConfig as Bankcard } from './Bankcard'

const route = []

route.push(Notice)
route.push(Branch)
route.push(BisSerive)
route.push(User)
// route.push(Test)
route.push(Admin)
route.push(Category)
route.push(Bankcard)

export default route.sort((a, b) => {
  return a.sort > b.sort
})
