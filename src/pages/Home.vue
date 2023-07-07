<template>
  <div id="Home">
    <div id="start" :class="isStarted && 'flyToTop'" v-if="!isQuizzFinished">
      <h2 >Sa quizz</h2>
      <button :onClick="startClick">Start</button>
    </div>
    <div v-if="!isQuizzFinished && isStarted" id="questionForm" :class="formClass" style="padding: 8px;  width: 90%; padding-left: auto; padding-right: auto;">
      <form v-if="currentQuestion" v-on:submit.prevent="onFormSubmit" style="display: flex; flex-direction: column; gap: 12px; ">
        <p class="centerWithMargin">question {{ questionIndex+1 }}: {{ currentQuestion.question }}</p>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-left: auto; margin-right: auto;" >
          <div v-for="(opt, index) in currentQuestion.options" :key="index" class="option"> 
          <input type="radio" name="opt-radio" :value="index" v-model="selected" >
          <label>{{ opt }}</label>
        </div>
        <button type="submit" style="padding: 0.5rem; max-width: 300px" class="centerWithMargin">{{ submitButtonText }}</button>
      </div>
      </form>
    </div>
    <Results v-else-if="isStarted"/>
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
        formClass: 'hideQuestionForm'
      }
    },
    props:{
      questionIndex: Number,
      afterFormSubmit: Function,
      onStartClick: Function,
      isStarted: Boolean
    },
    beforeCreate(){
      getQuizz('saQuizz').then(r=>{
        this.questionList = r
      })
    },
    watch:{
      isStarted(val){
        if(val) setTimeout(()=>{
          this.formClass = 'showQuestionForm'
        }, 150)
        else this.formClass = 'hideQuestionForm'
      }
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

        Object.values(e.target).forEach(e=>{
          if(e.checked === undefined) return
          e.checked = false
        })

        quizzResult.value.push({
          quizz: this.currentQuestion,
          userAnswer: this.selected
        })
        this.afterFormSubmit()
       },
       startClick(){
        if(this.isStarted) return
        this.onStartClick()
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
    overflow-y: auto;
    height: 100%;
  }

  .centerWithMargin{
    margin-left: auto;
    margin-right: auto;
  }

  .showQuestionForm{
    transition: opacity ease-in-out 1s;
    opacity: 1;
  }
  .hideQuestionForm{
    transition: opacity ease-in-out 1s;
    opacity: 0;
  }
  

  .option{
    display: flex;
    flex-direction: row;
    gap:5px;
  }

  #start{
    transition: transform linear 1s; 
  }
  .flyToTop{
    transition: transform ease-in-out 0.5s;
    transform: translateY(-100vh);
  }
</style>