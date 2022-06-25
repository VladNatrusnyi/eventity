import { getDatabase, ref, push, set, onValue, update } from 'firebase/database'

export default {
  state: {
    currentComments: [],
    showCurrentComments: [],
    giveFeedbackError: false
  },
  mutations: {
    GET_CURRENT_COMMENTS: (state, commentsData) => {
      state.currentComments.unshift(commentsData)
    },
    SHOW_COMMENTS: (state, payload) => {
      state.showCurrentComments = []
      if (payload && state.currentComments.length > 1) {
        state.showCurrentComments = state.currentComments
      } else {
        state.showCurrentComments.push(state.currentComments[0])
      }
    }
  },
  actions: {
    ADD_NEW_COMMENT ({ commit, getters, state, dispatch }, payload) {
      const db = getDatabase()
      const postListRef = ref(db, 'comments')
      const newPostRef = push(postListRef)
      set(newPostRef, {
        commentId: newPostRef.key,
        commentCreatorId: getters.user,
        recipient: payload.userId,
        commentText: payload.commentText,
        creationData: JSON.stringify(new Date().toString())
      })
      state.currentComments = []
      this.dispatch('GET_CURRENT_COMMENTS', payload.userId)
      // commit('ADD_NEW_EVENT')
    },
    GET_CURRENT_COMMENTS ({ commit, state, dispatch }, recipientId) {
      state.currentComments = []
      const db = getDatabase()
      const currentOrdersRef = ref(db, 'comments')
      onValue(currentOrdersRef, (responseItem) => {
        const commentsData = responseItem.val()
        for (const item in commentsData) {
          if (commentsData[item].recipient === recipientId) {
            const db = getDatabase()
            const currentCommentsForOrderRef = ref(db, 'users')
            onValue(currentCommentsForOrderRef, (responseIt) => {
              const usersData = responseIt.val()
              for (const user in usersData) {
                if (usersData[user].id === commentsData[item].commentCreatorId) {
                  commentsData[item].commentCreatorData = usersData[user]
                }
              }
            })
            commit('GET_CURRENT_COMMENTS', commentsData[item])
            this.dispatch('SHOW_COMMENTS', false)
          }
        }
      })
    },
    SHOW_COMMENTS ({ commit, state }, payload) {
      commit('SHOW_COMMENTS', payload)
    },
    GIVE_FEEDBACK ({ commit, state, getters }, payload) {
      const db = getDatabase()
      const currentEventsRef = ref(db, `comments/${payload.commentId}`)
      onValue(currentEventsRef, (comment) => {
        const data = comment.val()
        try {
          state.giveFeedbackError = false
          const updates = {}
          updates['/comments/' + payload.commentId] = { ...data, feedbackText: payload.feedbackText }
          update(ref(db), updates)
          state.currentComments = []
          this.dispatch('GET_CURRENT_COMMENTS', payload.recipient)
        } catch (e) {
          console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack)
          state.giveFeedbackError = true
        }
      })
    }
  },
  getters: {
    CURRENT_COMMENTS (state) {
      return state.currentComments
    },
    SHOW_CURRENT_COMMENTS (state) {
      return state.showCurrentComments
    },
    GIVE_FEEDBACK_ERROR (state) {
      return state.giveFeedbackError
    }
  }
}
