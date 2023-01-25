import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { getQuery } from '../firebase/db.js';
export default {
  template: template('search-form'),
  setup() {
    const collectionSelection = ref('');
    const searchField = ref('');
    const operatorSelection = ref('');
    const searchValue = ref('');
    const searchResult = ref('');

    const searchInputLabel = computed(() => collectionSelection.value.slice(0, 1).toUpperCase() + collectionSelection.value.slice(1, collectionSelection.value.length - 1));

    const isValid = computed(() => !!collectionSelection.value && !!searchField.value && !!searchValue.value && !!operatorSelection.value)

    const handleSearchSubmit = async (e) => {
      if (!isValid.value) return;

      const params = {
        // collection: collectionSelection.value,
        field: searchField.value,
        operator: operatorSelection.value,
        value: searchValue.value,
      }
      
      searchResult.value = await getQuery(collectionSelection.value, { params })

      // console.warn('isValid', isValid.value)
      console.log('handleSearchSubmit', { params });
      console.log('handleSearchSubmit', searchResult.value );
    };
    // const handleCollectionSelectionChange = (e) => {
    //   collectionSelection.value = e.target.selectedOptions[0].value
    //   console.warn('collectionSelection.value', collectionSelection.value)
    // };
    console.log('SEARCH FORM');

    return {
      handleSearchSubmit,
      operatorSelection,
      // handleCollectionSelectionChange,
      collectionSelection,
      searchInputLabel,
      searchField,
      searchValue
    }
  }
}