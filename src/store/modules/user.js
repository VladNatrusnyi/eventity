import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
export default {
  state: {
    user: null,
    loading: false,
    error: '',
    userName: ''
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    loginUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = ''
    },
    SET_USER: (state, userData) => {
      state.userName = userData.name
    }
  },
  actions: {
    registerUser ({ commit, dispatch }, { email, password, name, surname, age, location, rating }) {
      commit('clearError')
      commit('setLoading', true)
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((data) => {
          console.log('Successfully registered!')
          console.log(data)
          commit('setUser', data.user.uid)
          const res = { id: data.user.uid, name: name, surname: surname, age: age, location: location, rating: rating }
          this.dispatch('CREATE_USER_PROFILE', res)
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error.message)
          throw error
        })
    },
    CREATE_USER_PROFILE ({ commit }, userData) {
      const db = getDatabase()
      const postListRef = ref(db, 'users')
      const newPostRef = push(postListRef)
      set(newPostRef, {
        ...userData,
        avatar: '',
        contacts: {
          email: '',
          phone: '',
          website: '',
          skype: '',
          instagram: '',
          telegram: ''
        },
        profileTitle: '',
        aboutInfo: ''
      })
      // commit('ADD_NEW_EVENT')
      // commit('CREATE_USER_PROFILE', userId, name, surname)
    },
    loginUser ({ commit, dispatch }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((data) => {
          console.log('Successfully registered!')
          console.log(data)
          commit('loginUser', data.user.uid)
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error.message)
          throw error
        })
    },
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    loggedUser ({ commit }, payload) {
      commit('setUser', payload.uid)
      console.log(payload.uid)
    },
    logoutUser ({ commit }) {
      signOut(getAuth())
      commit('setUser', null)
    },
    GET_USER_FROM_API ({ commit, state }) {
      const db = getDatabase()
      const currentEventsRef = ref(db, 'users')
      onValue(currentEventsRef, (users) => {
        const data = users.val()
        for (const user in data) {
          if (data[user].id === state.user) {
            commit('SET_USER', data[user])
          }
        }
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    checkUser (state) {
      return state.user !== null
    },
    USER_NAME (state) {
      return state.userName
    }
  }
}
