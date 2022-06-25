// import axios from 'axios'
import { getDatabase, ref, push, set, onValue, update } from 'firebase/database'
// query, orderByChild
export default {
  state: {
    events: [],
    currentEvent: {},
    currentUser: {},
    currentOrders: [],
    sortedOrders: [],
    updateUserInfoError: false,
    updateEventInfoError: false,
    myEvents: []
  },
  actions: {
    ADD_NEW_EVENT ({ commit }, newEvent) {
      const db = getDatabase()
      const postListRef = ref(db, 'events')
      const newPostRef = push(postListRef)
      console.log('newPostRef', newPostRef)
      set(newPostRef, {
        ...newEvent
        // id: newPostRef.key
      })
      commit('ADD_NEW_EVENT')
    },
    GET_EVENTS_FROM_API ({ commit, dispatch }) {
      const db = getDatabase()
      const eventsRef = ref(db, 'events')
      onValue(eventsRef, (events) => {
        const data = events.val()
        console.log(data)
        commit('GET_EVENTS_TO_STATE', data)
        this.dispatch('GET_FILTERED_EVENTS', { selectedEventType: [], selectedWorkerType: [], selectedCityType: [], selectedDateType: [] })
      })
    },
    GET_MY_EVENTS_FROM_API ({ commit, getters }) {
      const db = getDatabase()
      const eventsRef = ref(db, 'events')
      onValue(eventsRef, (events) => {
        const data = events.val()
        const res = []
        for (const item in data) {
          if (data[item].creatorId === getters.user) {
            data[item].id = item
            res.unshift(data[item])
          }
        }
        commit('GET_MY_EVENTS_TO_STATE', res)
      })
    },
    GET_FILTERED_MY_EVENTS_FROM_API ({ commit }, eventType) {
      commit('GET_FILTERED_MY_EVENTS_FROM_API', eventType)
    },
    GET_CURRENT_EVENT_FROM_API ({ commit, dispatch }, eventId) {
      const db = getDatabase()
      const currentEventsRef = ref(db, `events/${eventId}`)
      onValue(currentEventsRef, (event) => {
        const data = event.val()
        data.id = event.key
        commit('SET_CURRENT_EVENT', data)
        this.dispatch('GET_CURRENT_USER_FROM_API', data.creatorId)
        this.dispatch('GET_CURRENT_ORDERS_FROM_API', data.id)
      })
    },
    CHANGE_EVENT_INFO ({ commit, state, getters }, changedInfo) {
      const db = getDatabase()
      const currentEventsRef = ref(db, 'events')
      onValue(currentEventsRef, (events) => {
        const data = events.val()
        for (const event in data) {
          if (event === state.currentEvent.id) {
            try {
              state.updateEventInfoError = false
              const updates = {}
              updates['/events/' + event] = { ...changedInfo, id: event, CreationDate: data[event].CreationDate }
              update(ref(db), updates)
            } catch (e) {
              console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack)
              state.updateEventInfoError = true
            }
          }
        }
      })
    },
    GET_CURRENT_USER_FROM_API ({ commit, state }, userId) {
      const db = getDatabase()
      const currentEventsRef = ref(db, 'users')
      onValue(currentEventsRef, (users) => {
        const data = users.val()
        for (const user in data) {
          if (data[user].id === userId) {
            commit('SET_CURRENT_USER', data[user])
          }
        }
      })
    },
    CHANGE_USER_INFO ({ commit, state, getters }, changedInfo) {
      const db = getDatabase()
      const currentEventsRef = ref(db, 'users')
      onValue(currentEventsRef, (users) => {
        const data = users.val()
        for (const user in data) {
          if (data[user].id === getters.user) {
            try {
              state.updateUserInfoError = false
              const updates = {}
              updates['/users/' + user] = { ...changedInfo, id: getters.user }
              update(ref(db), updates)
            } catch (e) {
              console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack)
              state.updateUserInfoError = true
            }
          }
        }
      })
    },
    GET_CURRENT_ORDERS_FROM_API ({ commit, state }) {
      state.currentOrders = []
      const db = getDatabase()
      const currentOrdersRef = ref(db, 'response')
      onValue(currentOrdersRef, (responseItem) => {
        const data = responseItem.val()
        commit('SET_CURRENT_ORDERS', data)
      })
    },
    ADD_NEW_RESPONSE ({ commit }, newResponse) {
      const db = getDatabase()
      const responseListRef = ref(db, 'response')
      const newResponseRef = push(responseListRef)
      set(newResponseRef, {
        ...newResponse
      })
      // commit('ADD_NEW_EVENT')
    },
    CLEAR_CURRENT_RESPONSE ({ commit }) {
      commit('CLEAR_CURRENT_RESPONSE')
    },
    GET_SORTED_ORDERS_FROM_API ({ commit, state }, workerType) {
      const db = getDatabase()
      const currentOrdersRef = ref(db, 'response')
      onValue(currentOrdersRef, (responseItem) => {
        const responseData = responseItem.val()
        if (workerType === 'Всі спеціальності') {
          this.dispatch('GET_CURRENT_ORDERS_FROM_API')
        } else {
          commit('SET_SORTED_ORDERS', { responseData, workerType })
        }
      })
    },
    SHOW_NEW_ORDERS ({ commit }) {
      commit('SHOW_NEW_ORDERS')
    }
  },
  mutations: {
    ADD_NEW_EVENT: (state) => {
      state.events = []
    },
    GET_EVENTS_TO_STATE: (state, events) => {
      state.events = []
      for (const item in events) {
        events[item].id = item
        if (events[item].isActive === true) {
          state.events.push(events[item])
        }
      }
      // state.events = events
    },
    GET_MY_EVENTS_TO_STATE: (state, events) => {
      state.events = []
      state.myEvents = []
      for (const item of events) {
        // events[item].id = item
        state.events.push(item)
        state.myEvents.push(item)
      }
      // state.events = events
    },
    SET_CURRENT_EVENT: (state, eventData) => {
      state.currentEvent = eventData
    },
    GET_FILTERED_MY_EVENTS_FROM_API: (state, eventType) => {
      const res = []
      eventType.forEach(eventTypeItem => {
        state.events.map(item => {
          if (item.TypeOfEvent.name === eventTypeItem.value) {
            res.push(item)
          }
        })
      })
      state.myEvents = res
    },
    SET_CURRENT_ORDERS: (state, responseData) => {
      for (const item in responseData) {
        if (responseData[item].eventId === state.currentEvent.id) {
          responseData[item].id = item
          const db = getDatabase()
          const currentUserForOrderRef = ref(db, 'users')
          onValue(currentUserForOrderRef, (responseItem) => {
            const usersData = responseItem.val()
            for (const user in usersData) {
              if (usersData[user].id === responseData[item].userId) {
                responseData[item].currentUserData = usersData[user]
              }
            }
          })
          state.currentOrders.push(responseData[item])
        }
      }
    },
    SET_CURRENT_USER: (state, userData) => {
      state.currentUser = userData
    },
    SET_SORTED_ORDERS: (state, { responseData, workerType }) => {
      state.currentOrders = []
      for (const item in responseData) {
        if (state.currentEvent.id === responseData[item].eventId && responseData[item].workerType === workerType) {
          responseData[item].id = item
          const db = getDatabase()
          const currentUserForOrderRef = ref(db, 'users')
          onValue(currentUserForOrderRef, (responseItem) => {
            const usersData = responseItem.val()
            for (const user in usersData) {
              if (usersData[user].id === responseData[item].userId) {
                responseData[item].currentUserData = usersData[user]
              }
            }
          })
          state.currentOrders.push(responseData[item])
        }
      }
    },
    CLEAR_CURRENT_RESPONSE: (state) => {
      state.currentOrders = []
    },
    SHOW_NEW_ORDERS: (state) => {
      state.currentOrders.reverse()
    }
  },
  getters: {
    EVENTS (state, getters) {
      return state.events
    },
    CURRENT_EVENT (state) {
      return state.currentEvent
    },
    CURRENT_USER (state) {
      return state.currentUser
    },
    CURRENT_ORDERS (state) {
      return state.currentOrders
    },
    UPDATE_USER_INFO_ERROR (state) {
      return state.updateUserInfoError
    },
    UPDATE_EVENT_INFO_ERROR (state) {
      return state.updateEventInfoError
    },
    MY_EVENTS (state) {
      return state.myEvents
    }
  }
}
