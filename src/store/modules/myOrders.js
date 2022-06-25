import { getDatabase, ref, onValue } from 'firebase/database'

export default {
  state: {
    MyCurrentOrders: []
  },
  mutations: {
    SET_MY_ORDERS: (state, payload) => {
      for (const item in payload.responseData) {
        if (payload.responseData[item].userId === payload.user) {
          payload.responseData[item].id = item
          console.log('опаааааа', payload.responseData[item].id)
          const db = getDatabase()
          const currentUserForOrderRef = ref(db, 'events')
          onValue(currentUserForOrderRef, (responseItem) => {
            const eventData = responseItem.val()
            for (const event in eventData) {
              eventData[event].id = event
              if (eventData[event].id === payload.responseData[item].eventId) {
                payload.responseData[item].currentEventData = eventData[event]
              }
            }
          })
          state.MyCurrentOrders.unshift(payload.responseData[item])
          console.log('MyCurrentOrders', payload.responseData[item])
        }
      }
    }
  },
  actions: {
    GET_MY_ORDERS_FROM_API ({ commit, state, getters }) {
      state.MyCurrentOrders = []
      const db = getDatabase()
      const currentOrdersRef = ref(db, 'response')
      onValue(currentOrdersRef, (responseItem) => {
        const data = responseItem.val()
        commit('SET_MY_ORDERS', { responseData: data, user: getters.user })
      })
    }
  },
  getters: {
    MY_CURRENT_ORDERS (state) {
      return state.MyCurrentOrders
    }
  }
}
