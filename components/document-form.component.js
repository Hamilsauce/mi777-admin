import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import { router } from '../router/index.js';
import { useRoute } from 'vue-router'
import {
  // getQuery,
  // updateDoc
  updateOrder
} from '../firebase/db.js';

const { template, utils } = ham;


export default {
  props: {
    order: Object,
  },
  template: template('document-form'),
  setup(props) {
    const searchValue = ref('');
    const order = ref(props.order);
    console.log('props.order', props.order)
    // const searchInputLabel = computed(() => collectionSelection.value.slice(0, 1).toUpperCase() + collectionSelection.value.slice(1, collectionSelection.value.length - 1));

    // const isValid = computed(() => !!collectionSelection.value && !!searchField.value && !!searchValue.value && !!operatorSelection.value)

    const handleUpdateSubmit = async (e) => {
      // if (!isValid.value) return;
// console.log('order.value.owner, order.value.id, { status: }', order.value.owner, order.value.id, { status: 'FUCK' })
      // const params = {
      //   // collection: collectionSelection.value,
      //   field: searchField.value,
      //   operator: operatorSelection.value,
      //   value: searchValue.value,
      // }
console.warn('handleUpdateSubmit order.value', order.value)
const updateResponse = await updateOrder(order.value.user, order.value.id, { status: 'FUCK' })
      // searchResult.value = await getQuery(collectionSelection.value, { params })
console.log('updateResponse', updateResponse)
      // console.warn('isValid', isValid.value)
      // console.log('handleSearchSubmit', { params });
      // console.log('handleSearchSubmit', searchResult.value);
    };
    // const handleCollectionSelectionChange = (e) => {
    //   collectionSelection.value = e.target.selectedOptions[0].value
    //   console.warn('collectionSelection.value', collectionSelection.value)
    // };
    console.log('DOC FORM', order.value);

    return {
      handleUpdateSubmit,
      // operatorSelection,
      // handleCollectionSelectionChange,
      // collectionSelection,
      // searchInputLabel,
      // searchField,
      // searchValue
    }
  }
}