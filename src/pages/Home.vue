<template>
  <div id="Home">
    <div id="start" :class="isStarted && 'flyToTop'" v-if="!isQuizzFinished">
      <h3>Select your quizz</h3>
      <form v-on:submit.prevent="onQuizzSubmit">
        <select name="selectQuizz" id="selectQuizz" :disabled="isStarted" required>
          <option></option>
          <option v-if="quizzList" v-for="quizz in quizzList" :value="quizz">
            {{ quizz }}
          </option>
          <option value="randomSlice">Random 30</option>
          <option value="all">All</option>
        </select>
        <button type="submit" :disabled="isStarted">Start</button>
      </form>
    </div>
    <div
      v-if="!isQuizzFinished && isStarted"
      id="questionForm"
      :class="formClass"
      style="padding: 8px; width: 90%; padding-left: auto; padding-right: auto"
    >
      <form
        v-if="currentQuestion"
        v-on:submit.prevent="onAnswerSubmit"
        style="display: flex; flex-direction: column; gap: 12px"
      >
        <p class="centerWithMargin">
          question {{ questionIndex + 1 }}: {{ currentQuestion.question }}
        </p>
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-left: auto;
            margin-right: auto;
          "
        >
          <div
            v-for="(opt, index) in currentQuestion.options"
            :key="index"
            class="option"
          >
            <input type="radio" name="opt-radio" :value="index" v-model="selected" />
            <label>{{ opt }}</label>
          </div>
          <button
            type="submit"
            style="padding: 0.5rem; max-width: 300px"
            class="centerWithMargin"
          >
            {{ submitButtonText }}
          </button>
        </div>
      </form>
    </div>
    <Results v-else-if="isStarted" />
  </div>
</template>

<script>
import Results from "./Results.vue";
import { quizzResult } from "../atoms";
import { getQuizz, getQuizzIds } from "../firebase";
import shuffleArray from "../utils/shuffleArray";

export default {
  name: "Home",

  data() {
    return {
      questionList: null,
      submitButtonText: "Avanti",
      selected: -1,
      formClass: "hideQuestionForm",
      quizzList: null,
    };
  },
  props: {
    questionIndex: Number,
    afterFormSubmit: Function,
    onStartClick: Function,
    isStarted: Boolean,
  },
  beforeCreate() {
    getQuizzIds().then((r) => (this.quizzList = r));
  },
  watch: {
    isStarted(val) {
      if (val)
        setTimeout(() => {
          this.formClass = "showQuestionForm";
        }, 150);
      else this.formClass = "hideQuestionForm";
    },
  },
  components: {
    Results,
  },
  computed: {
    currentQuestion() {
      if (this.questionList?.length < 1) return;
      return this.questionList?.at(this.questionIndex);
    },
    isQuizzFinished() {
      if (this.questionList === null) return false;
      return this.questionIndex > this.questionList.length - 1;
    },
  },
  methods: {
    onAnswerSubmit(e) {
      if (this.selected < 0 || this.selected > this.currentQuestion.options.length - 1) {
        alert("Devi selezionare un'opzione valida ");
        return;
      }
      Object.values(e.target).forEach((e) => {
        e.checked = undefined;
      });

      quizzResult.value.push({
        quizz: this.currentQuestion,
        userAnswer: this.selected,
      });
      this.afterFormSubmit();
      this.selected = -1;
    },

    startClick() {
      if (this.isStarted) return;
      this.onStartClick();
    },
    mashQuizzes(value) {
      const prList = [];

      this.quizzList.forEach((q) => {
        prList.push(getQuizz(q));
      });
      Promise.all(prList).then((resultList) => {
        this.questionList = [];
        resultList.forEach((quizz) => this.questionList.push(...quizz));
        this.questionList = shuffleArray(this.questionList);
        console.log(value);
        if (value === "randomSlice") {
          const random = Math.floor(Math.random() * (this.questionList.length - 30));
          this.questionList = this.questionList.slice(0, 30);
        }
        this.startClick();
      });
    },
    onQuizzSubmit(e) {
      const value = e.target.selectQuizz.value;
      e.target.selectQuizz.value = undefined;
      if (!value || !this.quizzList) return;
      if (value === "all" || value === "randomSlice") return this.mashQuizzes(value);

      getQuizz(value).then((r) => {
        this.questionList = r;
        this.questionList = shuffleArray(this.questionList);
        this.startClick();
      });
    },
  },
};
</script>
<style>
#Home {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
}

.centerWithMargin {
  margin-left: auto;
  margin-right: auto;
}

.showQuestionForm {
  transition: opacity ease-in-out 1s;
  opacity: 1;
}
.hideQuestionForm {
  transition: opacity ease-in-out 1s;
  opacity: 0;
}

.option {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

#start {
  transition: transform linear 1s;
}
.flyToTop {
  transition: transform ease-in-out 0.5s;
  transform: translateY(-100vh);
}
</style>
