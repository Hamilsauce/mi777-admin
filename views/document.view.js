import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import { router } from '../router/index.js';
import { useRoute } from 'vue-router'
import DocumentForm from '../components/document-form.component.js';
import { getDocumentById, getCachedDocument, getCachedCollection } from '../firebase/db.js';
const { template, utils } = ham;

export default {
  template: template('document-view'),
  components: { 'document-form': DocumentForm },
  setup() {
    const route = useRoute();
    console.log('route.params', route.params)
    const orderId = computed(() => route.params.id)
    const order = ref(null)
    // const order = ref(getCachedDocument('orders', orderId.value));
    // const orderDoc = getDocumentById('users')

    // console.log('order.value', order.value)

    const getDoc = async () => {
      // order.value = (await getCachedDocument('orders', orderId.value));
    console.log('orderId.value', orderId.value)
      order.value = (await getDocumentById('orders', orderId.value));
    
      console.warn('GET DOC IN DOC VIEW T{ order }', order.value);
   
    }

    getDoc()

    setTimeout(() => {
      console.log('{ order }', order.value);

      console.log(' ', );
    }, 3000)

    return {
      order
    }
  }
}