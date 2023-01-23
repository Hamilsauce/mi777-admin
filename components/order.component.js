import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;

export default {
  template: template('order'),
  props: {
    order: Object,
  },
  setup(props) {
    console.log('props', props.order)
    const order = ref(props.order)
    // const collectionSelection = ref('tokens');

    const handleClick = (e) => {
      console.log('handleClick');
    };

    // console.log('ORDER', order.value);

    return {
      order,
      handleClick,
    }
  }
}