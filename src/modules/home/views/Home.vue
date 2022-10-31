<template>
    <div id="wrapper">
        <SelfIntroduction/>
        <HolyWrit1/>
        <HolyWrit2/>
        <HolyWrit3/>
        <Panel3/>
        <Follower/>
        <Panel4/>
        <Copyright/>
    </div>
</template>

<script setup>
import {onMounted, nextTick} from 'vue';
import SelfIntroduction from '../components/SelfIntroduction.vue';
import Copyright from '../components/Copyright.vue';
import Follower from '../components/Follower.vue';
import HolyWrit1 from '../components/HolyWrit1.vue';
import HolyWrit2 from '../components/HolyWrit2.vue';
import HolyWrit3 from '../components/HolyWrit3.vue';
import Panel3 from '../components/Panel3.vue';
import Panel4 from '../components/Panel4.vue';

onMounted(() => {
    nextTick(()=>{
        const element = window.document.createElement('script');
        element.setAttribute('data-cfasync','false');
        element.src = '/js/ethereal.min.js';
        window.document.body.append(element);
    });
});
</script>
