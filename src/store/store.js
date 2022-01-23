import Vuex from 'vuex'

export const store = new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
    getPosts: state => {
      return state.posts
    }
    // getPost: state => {
    //   return state.post
    // }
  },
  actions: {
    loadPosts (context, posts) {
      context.commit('loadPosts', posts)
    },
    addNewPost (context, post) {
      context.commit('addNewPost', post)
    }
  },
  mutations: {
    loadPosts (state, payload) {
      state.posts = payload
    },
    addNewPost (state, payload) {
      state.posts.push(payload)
    }
  }
})
