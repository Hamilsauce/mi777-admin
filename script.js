import { createApp, computed, ref } from 'vue'
import { router } from './router/index.js';

const app = createApp({
  setup() {
    const cnt = ref(0);

    setInterval(() => {
      cnt.value++
    }, 1000);

    return {
      cnt
    }
  },
});

app.use(router);

app.mount('#app');