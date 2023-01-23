import { createApp, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { router } from './router/index.js';
import { getCollectionDocs } from './firebase/db.js';



const app = createApp({
  setup() {
    const route = useRoute();
    const currentPath = computed(() => route.path)
    const cnt = ref(0);

    setInterval(() => {
      cnt.value++
    }, 1000);

    return {
      cnt,
      currentPath
    }
  },
});

app.use(router);

app.mount('#app');