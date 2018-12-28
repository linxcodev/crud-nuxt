import axios from '~/plugins/axios'

export const state = () => ({
  countries: []
})

export const mutations = {
  setData(state, items) {
    state.countries = items
  },
  postData(state, item) {
    state.countries.push(item)
  },
  remData(state, id) {
    const foundIndex = state.countries.findIndex(p => p.id === id)
    state.countries.splice(foundIndex, 1)
  },
  updtData(state, data) {
    const foundItems = state.countries.find(p => p.id === data.id)
    foundItems.name = data.name
  }
}

export const actions = {
  async nuxtServerInit({commit}) {
    const res = await axios.get('negara')
    commit('setData', res.data)
  },
  async add({commit}, nama) {
    const res = await axios.post('negara', {name: nama})
    commit('postData', res.data)
  },
  async remove({commit}, id) {
    await axios.delete('negara/' + id)
    commit('remData', id)
  },
  async getData({commit}, id) {
    const res = await axios.get('negara/' + id)
    return res.data
  },
  async updtData({commit}, data) {
    const res = await axios.put('negara/' + data.id, {name: data.name})
    commit('updtData', data)
  }
}
