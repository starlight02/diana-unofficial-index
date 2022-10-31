<template>
    <div class="copyright">
        <p>谨以此站献给我最爱的嘉然小姐，愿你每天天都开开心心的。</p>
        <p>
            Copyright © 2021<span v-if="thisYear>2021"> - <span v-text="thisYear"></span></span> <a target="_blank" href="https://blog.aili.moe">aili.moe</a>.&ensp;All Rights Reserved.&ensp;Powered by <a target="_blank" href="https://html5up.net">HTML5 UP</a> & <a href="https://v3.cn.vuejs.org">Vue.js</a>.&ensp;Made by ♥ with in 嘉然组.
        </p>
    </div>
</template>

<script setup>
import {computed} from 'vue';
 
const thisYear = computed(()=> new Date().getFullYear());
</script>

<style lang="scss" scoped>
.copyright{
    @media screen and (max-width: 736px){
        position: unset !important;
        padding-top: 1rem;
    }

    p {
        margin: 0;
        text-align: right;
        
        @media screen and (max-width: 736px){
            text-align: center;
        }
    }
}
</style>
