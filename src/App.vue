<template>
    <Home/>
</template>

<script setup>
import Home from './modules/home/views/Home.vue';

if (import.meta.env.MODE !== 'production') {
    console.log(`Vite APP 运行在 ${import.meta.env.MODE} 模式`);
}
</script>

<style>
.aplayer-icon{
    line-height: initial;
}
.aplayer-title{
    color: initial;
}
</style>
