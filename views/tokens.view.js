import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { getCollectionDocs, getDocCount } from '../firebase/db.js';

export default {
  template: template('tokens-view'),
  setup() {
    const tokens = ref([]);

    setTimeout(async () => {
      tokens.value = (await getCollectionDocs('tokens')).filter(_ => !!_.owner).sort((a, b) => +a.id - +b.id)
      // userCount.value = await getDocCount('tokens')
      console.warn('tokens.value', tokens.value)
    }, 0);

    return {
      tokens
    }
  }
}