import { getDatabase, ref, update, remove } from 'firebase/database'

export default {
  state: {
    closeEventError: false,
    deleteEventError: false
  },
  mutations: {
  },
  actions: {
    CHANGE_EVENT_STATUS ({ commit, state, getters }, eventStatus) {
      try {
        const db = getDatabase()
        state.closeEventError = false
        const updates = {}
        updates[`/events/${getters.CURRENT_EVENT.id}/isActive`] = eventStatus
        update(ref(db), updates)
      } catch (e) {
        console.log('Помилка при закритті завдання ' + e.name + ':' + e.message + '\n' + e.stack)
        state.closeEventError = true
      }
    },
    DELETE_EVENT ({ commit, state, getters }) {
      try {
        const db = getDatabase()
        const deleteEventRef = ref(db, `/events/${getters.CURRENT_EVENT.id}`)
        remove(deleteEventRef)
        state.deleteEventError = false
        // remove(ref(db), `/events/${getters.CURRENT_EVENT.id}`)
      } catch (e) {
        console.log('Помилка при видаленні завдання ' + e.name + ':' + e.message + '\n' + e.stack)
        state.deleteEventError = true
      }
    }
  },
  getters: {
    CLOSE_EVENT_ERROR (state) {
      return state.closeEventError
    },
    DELETE_EVENT_ERROR (state) {
      return state.deleteEventError
    }
  }
}
