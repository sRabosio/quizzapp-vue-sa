<template>
  <div id="app" style="overflow: hidden;">
    <header>
      <Navbar :on-restart-button="onRestartButton" />
    </header>
    <main style="overflow:scroll;">
      <Home :question-index="questionIndex" :after-form-submit="afterFormSubmit"/>
    </main>
  </div>
</template>

<script>
import '@csstools/normalize.css'
import Home from './pages/Home.vue'
import Navbar from './components/Navbar.vue'
import {quizzResult} from './atoms'


export default {
  name: 'App',
  data(){
    return {
      questionIndex: 0
    }
  },
  components:{
    "Navbar": Navbar,
    "Home":Home
  },
  methods:{
    onRestartButton(){
      quizzResult.value = []
      this.questionIndex = 0
    },
    afterFormSubmit(){
      this.questionIndex++
    }
  }
}
</script>
<style>
  #app, main{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
</style>
