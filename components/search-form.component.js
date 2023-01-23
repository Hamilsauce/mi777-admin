import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;

export default {
  template: template('search-form'),
  setup() {
    const tokenCount = ref(777);
    const collectionSelection = ref('tokens');

    const handleSearchSubmit = (e) => {
      console.log('handleSearchSubmit');
    };

    const handleCollectionSelectionChange = (e) => {
      collectionSelection.value = e.target.selectedOptions[0].value
      console.warn('collectionSelection.value', collectionSelection.value)
    };
console.log('SEARCH FORM');

    return {
      tokenCount,
      handleSearchSubmit,
      handleCollectionSelectionChange,
      collectionSelection,
    }
  }
}