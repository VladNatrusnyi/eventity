import Vuex from 'vuex'
import AllEventsPage from './modules/AllEventsPage.store'
import user from './modules/user'
import closeEvent from './modules/closeEvent'
import comments from './modules/comments'
import myOrders from './modules/myOrders'
import filterEvents from './modules/filterEvents'

export default new Vuex.Store({
  modules: {
    AllEventsPage,
    user,
    closeEvent,
    comments,
    myOrders,
    filterEvents
  }
})
