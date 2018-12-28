<template>
  <section class="hero is-medium is-danger is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        CRUD Nuxt js
      </h1>
      <h2 class="subtitle">
        belajar CRUD API nuxtjs
      </h2>
      <br><br><br><br>
      <div class="columns">
        <div class="column">
          <label for="addData">Tambah Data Negara</label>
          <input class="input" type="text" placeholder="Tambah data"
            v-model="name" id="addData">
          <br><br>
          <a class="button is-link" :class="{hidden: !isHidden}"
            @click="add(name)">Submit Data</a>
          <a class="button is-warning" :class="{hidden: isHidden}"
            @click="update()">Update Data</a>
        </div>
        <div class="column">
          <ul class="panel">
            <li class="panel-heading">Data Negara</li>
            <li class="panel-block">
              <input type="text" class="input is-small" v-model="searchKey">
            </li>
            <li class="panel-block" v-for="country in filteredCountr">
              {{country.name}} /
              <button class="button is-link" @click="edit(country.id)">Edit</button> /
              <button class="button is-warning" @click="remove(country.id)">Hapus</button> /
              <label for="addData">
                <a class="button is-black">Tambah</a>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      name: null,
      isHidden: true,
      activateItem: null,
      searchKey: '',
      countries: this.$store.state.countries
    }
  },
  computed: {
    filteredCountr() {
      return this.countries.filter(coun => coun.name.toLowerCase().
              indexOf(this.searchKey.toLowerCase()) !== -1)
    }
  },
  methods: {
    add(name) {
      if (this.name == null) {
        alert("data tidak boleh kosong")
      } else {
        this.$store.dispatch('add', name)
      }
      this.name = null
    },
    remove(id) {
      this.$store.dispatch('remove', id)
    },
    edit(id) {
      this.$store.dispatch('getData', id).then(res => {
        this.name = res.name
        this.isHidden = false
        this.activateItem = res
      })
    },
    update() {
      this.$store.dispatch('updtData', {
        id: this.activateItem.id,
        name: this.name
      })
      this.name = null
      this.isHidden = true
    }
  }
}
</script>
<style scoped="">
  .hidden {
    display: none;
  }
</style>
