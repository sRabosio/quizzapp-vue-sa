
<template>
    <div>
        <h1>{{ score }}/{{ quizzResult.length }}</h1>
        <container v-for="res in quizzResult" :key="res.quizz.question">
            <h3>{{res.quizz.question}}</h3>
            <p v-for="(opt, index) in res.quizz.options" :key="index">
                {{ opt }}
                <img v-if="(res.quizz.answer === res.userAnswer) && (res.quizz.answer === index)" class="icon" src="../assets/correct.png"/>
                <img v-if="(res.quizz.answer !== res.userAnswer) && (res.userAnswer === index)" class="icon" src="../assets/wrong.svg"/>
                <img v-if="(res.quizz.answer !== res.userAnswer) && (res.quizz.answer === index)" class="icon" src="../assets/right.png"/>
            </p>
        </container>
    </div>
</template>

<script> 
import {quizzResult} from '../atoms'


export default {
    computed:{
        score(){
            let result = 0
            quizzResult.value.forEach(q=>{
                if(q.quizz.answer === q.userAnswer) result++
            })
            return result
        },
        quizzResult(){
            return quizzResult.value
        }
    }
}
</script>
<style>
    .icon{
        height: 1rem;
        width: 1rem;
    }
    p, h3{
        margin: 0;
    }
    container{
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;
    }
</style>