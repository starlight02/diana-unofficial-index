import banner from '@/assets/banner.txt?raw';

setTimeout(() => {
    console.log(`%c ${banner}`, 'color: #E799B0');

    const style1 = 'background: #606060; color: #fff; border-radius: 2px 0 0 2px;';
    const style2 = 'background: #E799B0; color: #fff; border-radius: 0 2px 2px 0;'; 
    console.log(`%c 作者：%c starshine@aili.moe `, style1, style2);
}, 100);
