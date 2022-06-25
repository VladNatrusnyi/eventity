export default {
  state: {
    filteredEvents: []
  },
  mutations: {
    GET_FILTERED_EVENTS: (state, payload) => {
      state.filteredEvents = []
      const filteredEvents = []
      payload.EVENTS.forEach((currEvent) => {
        let type = false
        if (payload.sortingElements.selectedEventType.length !== 0) {
          payload.sortingElements.selectedEventType.forEach((sortItem) => {
            if (sortItem === currEvent.TypeOfEvent.name) {
              type = true
            }
          })
        } else {
          type = true
        }
        let worker = false
        if (payload.sortingElements.selectedWorkerType.length !== 0) {
          payload.sortingElements.selectedWorkerType.forEach((sortItem) => {
            currEvent.workers.forEach((item2) => {
              if (sortItem === item2.value) {
                worker = true
              }
            })
          })
        } else {
          worker = true
        }
        let city = false
        if (payload.sortingElements.selectedCityType.length !== 0) {
          payload.sortingElements.selectedCityType.forEach((sortItem) => {
            if (sortItem === currEvent.EventCity) {
              city = true
            }
          })
        } else {
          city = true
        }
        let date = false
        if (payload.sortingElements.selectedDateType.length !== 0) {
          if (new Date(currEvent.realTime) >= new Date(payload.sortingElements.selectedDateType[0]) &&
            new Date(currEvent.realTime) <= new Date(payload.sortingElements.selectedDateType[1])) {
            date = true
          }
          if (new Date(currEvent.realTime).getDate() === new Date(payload.sortingElements.selectedDateType[0]).getDate()) {
            date = true
          }
        } else {
          date = true
        }
        if (type && worker && city && date) {
          filteredEvents.push(currEvent)
        }
      })
      state.filteredEvents = Array.from(new Set(filteredEvents))
    }
  },
  actions: {
    GET_FILTERED_EVENTS ({ commit, getters }, payload) {
      commit('GET_FILTERED_EVENTS', { sortingElements: payload, EVENTS: getters.EVENTS })
    }
  },
  getters: {
    filteredEvents (state) {
      return state.filteredEvents
    }
  }
}
