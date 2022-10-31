<template>
    <section class="panel spotlight center color2">
        <div class="content span-3-25">
            <h2 class="major">
                <span>🎉 BILIBILI 关注：</span>
                <Vue3Autocounter id="follower" ref="counter" :startAmount="initialFollower" :endAmount="latestFollower" :autoinit="autoInit"/>
                <span> 🎉</span>
            </h2>
            <p>截止至：{{ latestTime }}</p>
        </div>
    </section>
</template>

<script setup>
import Vue3Autocounter from 'vue3-autocounter';
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import to from '@/utils/to';

const initialFollower = ref(500000);
const latestFollower = ref(500000);
const latestTime = ref('无');
const counter = ref({});
const autoInit = ref(false);

async function getDianaFollower() {
    const [error, data] = await to(window.api.getBilibiliFollowerByTenApi({ uid: 672328094 }));
    if (error) {
        return Promise.reject(error);
    }
    const {code, data: {follower}} = data;
    if (code != 0) {
        return Promise.reject(data);
    }
    initialFollower.value = latestFollower.value;
    latestFollower.value = follower;
    latestTime.value = new Date().toLocaleString();
    return Promise.resolve(follower);
}

getDianaFollower();

const callback = (entries, observer) => {
    entries.forEach(entry => {
        // entry.time;               // 触发的时间
        // entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
        // entry.boundingClientRect; // 被观察者的位置举行
        // entry.intersectionRect;   // 重叠区域的位置矩形
        // entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
        // const counterElement = entry.target;             // 被观察者
        // const computedStyle = window.getComputedStyle(counterElement);
        if (entry.intersectionRatio >= 1 && entry.isIntersecting) {
            console.log('数字滚动开始');
            counter.value?.start();
        }
    });
};

const observer = new IntersectionObserver(callback, {threshold: 1.0});
let flag;
onMounted(() => {
    nextTick(() => {
        const element = counter.value.$el;
        observer.observe(element);
        flag = window.setInterval(() => {
            getDianaFollower().then(() => {
                counter.value.start();
            });
        }, 1000 * 60);
    });
});

onBeforeUnmount(()=> {
    window.clearInterval(flag);
});
</script>
