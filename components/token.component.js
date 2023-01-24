import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;

export default {
  template: template('token'),
  props: {
    token: Object,
  },
  setup(props) {
    const token = ref(props.token)
    console.log('TOKEN', token.value)
    // const collectionSelection = ref('tokens');

    const handleClick = (e) => {
      console.log('handleClick');
    };

    // console.log('token', token.value);

    return {
      token,
      handleClick,
    }
  }
}