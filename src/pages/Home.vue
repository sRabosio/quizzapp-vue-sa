<template>
  <div id="Home">
    <div v-if="!isQuizzFinished">
      <p>aaa</p>
      <form v-if="currentQuestion" v-on:submit.prevent="onFormSubmit" style="display: flex; flex-direction: column; gap: 12px;">
        <p style="margin: 0">question {{ questionIndex+1 }}: {{ currentQuestion.question }}</p>
        <div style="display: contents;">
          <div v-for="(opt, index) in currentQuestion.options" :key="index" class="option">
          <input type="radio" name="opt-radio" :value="index" v-model="selected" >
          <label>{{ opt }}</label>
        </div>
        <button type="submit" style="padding: 0.5rem;">{{ submitButtonText }}</button>
      </div>
      </form>
    </div>
    <Results v-else/>
  </div>
</template>

<script>
  import Results from "./Results.vue"
  import {quizzResult} from '../atoms'
  import {getQuizz} from '../firebase'
  export default {
    name:"Home",
    
    data(){
      return{
        questionList: null,
        submitButtonText: "Avanti",
        selected: -1,
       
      }
    },
    props:{
      questionIndex: Number,
      afterFormSubmit: Function
    },
    beforeMount(){
      getQuizz('test').then(r=>{
        this.questionList = r
        console.log(r)
      })
    },
    components:{
      Results
    },
    computed:{
        currentQuestion(){
          if(this.questionList?.length < 1) return
          return this.questionList?.at(this.questionIndex)
        },
        isQuizzFinished() {
          if(this.questionList === null) return false
          return this.questionIndex > this.questionList.length-1
        }
    },
    methods:{
       onFormSubmit(e){
        if(this.selected < 0 || this.selected>this.currentQuestion.options.length-1){
          alert("Devi selezionare un'opzione valida ")
          return
        }
        quizzResult.value.push({
          quizz: this.currentQuestion,
          userAnswer: this.selected
        })
        this.afterFormSubmit()
       }
    },
  }
</script>
<style>
  #Home{
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    height: 100%;
  }

  .option{
    display: flex;
    flex-direction: row;
  }
</style>