<template>
    <nav style="border-bottom: 1px solid #dedede; padding:32px; width: 100%;">
        <ul>
            <li>
                <strong>{{title}}</strong>
            </li>
        </ul>
        <ul>
            <li role="button" :onClick="onRestartButton" > {{ restartText }} </li>
        </ul>
    </nav>
</template>
<script>
    export default {
        name: "Navbar",
        data(){
            return{
                title:"SA QUIZZ",
                restartText:"Restart"
            }
        },
        props: {
            onRestartButton: Function
        }
    }
</script>