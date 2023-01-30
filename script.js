import { createApp, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { router } from './router/index.js';
import { getCollectionDocs } from './firebase/db.js';

/*
  FEATURES
  
  Queries
    - Find all Orders by token/order ID
    - Find all token docs by owner
    - Find all owned or unowned tokens
    - Find all owned or unowned tokens
    - Join orders to token by wallet
    
    - Search and View reults across Collections
*/

const app = createApp({
  setup() {
    const route = useRoute();
    const currentPath = computed(() => route.path.replace(/\//g,''));
    const cnt = ref(0);
console.log('route', route)
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