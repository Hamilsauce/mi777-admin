import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;

export default {
  template: template('users-view'),
  setup() {
    const userCount = ref(30);

    return {
      userCount
    }
  }
}