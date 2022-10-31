import {createApp} from 'vue';
import App from './App.vue';
import api from './plugins/api';
import './plugins/aplayer';
import './assets/styles/ethereal.css';
import './plugins/console';

window.api = api;

export const app = createApp(App).mount('#app');
