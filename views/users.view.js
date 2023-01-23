import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { getCollectionDocs, getDocCount } from '../firebase/db.js';

export default {
  template: template('users-view'),
  setup() {
    const users = ref([]);

    setTimeout(async () => {
      users.value = (await getCollectionDocs('users'))//.sort((a, b) => +a.id - +b.id)
      // userCount.value = await getDocCount('users')
      console.warn('users.value', users.value)
    }, 0);


    return {
      users
    }
  }
}