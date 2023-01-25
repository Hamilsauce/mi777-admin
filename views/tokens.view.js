import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { getCollectionDocs, getOwnedTokens } from '../firebase/db.js';
import TokenItem from '../components/token.component.js';

export default {
  components: {
    'token-item': TokenItem
  },
  template: template('tokens-view'),
  setup() {
    const tokens = ref([]);
  
    const getTokens = async () => {
      tokens.value = (await getOwnedTokens()).sort((a, b) => +a.id - +b.id)
      console.warn('tokens.value', tokens.value)
    }
    getTokens()
    // setTimeout(async () => {
    //   tokens.value = (await getCollectionDocs('tokens')).filter(_ => !!_.owner).sort((a, b) => +a.id - +b.id)
    //   // userCount.value = await getDocCount('tokens')
    // }, 0);

    return {
      tokens
    }
  }
}