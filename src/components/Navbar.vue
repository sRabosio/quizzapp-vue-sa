<template>
    <nav style="justify-content: center; border-bottom: 1px solid #dedede;">
        <ul>
            <li>
                <strong>{{title}}</strong>
            </li>
        </ul>
    </nav>
</template>
<script>
    export default {
        name: "Navbar",
        data(){
            return{
                title:"SA QUIZZ"
            }
        }
    }
</script>