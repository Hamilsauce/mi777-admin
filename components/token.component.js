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
    // const modified = computed(() => token.modified.value ? props.token.modified.toDate().toLocalDateString() : null  )
    console.log('TOKEN.value', token.value.constructor.name )
    // console.log('modified', modified.value)
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