<template>
  <div id="app">
    <header>
      <Navbar/>
    </header>
    <main>
      <Home/>
    </main>
  </div>
</template>

<script>
import '@csstools/normalize.css'
import { getQuizz } from './firebase'
import Home from './pages/Home.vue'
import Navbar from './components/Navbar.vue'


export default {
  name: 'App',
  components:{
    "Navbar": Navbar,
    "Home":Home
  }
}
</script>
<style>
  #app main{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;
  }
</style>
