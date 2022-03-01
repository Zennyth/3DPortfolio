import { createStore } from 'vuex'
import app from "./app"

// Create a new store instance.
const store = createStore({
  modules: {
    app
  }
})

export default store;