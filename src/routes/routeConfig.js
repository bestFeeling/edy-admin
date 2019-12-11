import { routeConfig as Notice } from './Notice'
import { routeConfig as Branch } from './Branch'
import { routeConfig as BisSerive } from './BisService'
import { routeConfig as User } from './User'
import { routeConfig as Test } from './Test'
import { routeConfig as Admin } from './Admin'
import { routeConfig as Category } from './Category'
import { routeConfig as Bankcard } from './Bankcard'
import { routeConfig as PushMessage } from './PushMessge'
import { routeConfig as Task } from './Task'
import { routeConfig as Dashboard } from './Dashboard'
import { routeConfig as Level } from './Level'

const route = []

route.push(Notice)
route.push(Branch)
// route.push(BisSerive)
route.push(User)
route.push(Level)
// route.push(Test)
route.push(Admin)
route.push(Category)
route.push(Bankcard)
route.push(PushMessage)
route.push(Task)
route.push(Dashboard)



export default route.sort((a, b) => {
  return a.sort > b.sort
})
