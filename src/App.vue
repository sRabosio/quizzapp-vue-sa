<template>
  <div id="app" style="overflow: hidden;">
    <header>
      <Navbar :on-restart-button="onRestartButton" />
    </header>
    <main style="overflow:hidden;">
      <Home :question-index="questionIndex" :after-form-submit="afterFormSubmit" :isStarted="isQuizzStarted" :onStartClick="onStartClick"/>
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
      questionIndex: 0,
      isQuizzStarted: false
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
      this.isQuizzStarted = false
    },
    afterFormSubmit(){
      this.questionIndex++
    },
    onStartClick(){
      this.isQuizzStarted =  true;
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
  main{
    margin: 32px;
  }
</style>
