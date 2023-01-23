import { defineComponent, computed, ref } from 'vue'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { getCollectionDocs } from '../firebase/db.js';
import OrderItem from '../components/order.component.js';
export default {
  components: {
    'order-item': OrderItem
  },
  template: template('orders-view'),
   setup() {
    const orders = ref([]);
    // orders.value = (await getCollectionDocs('orders')).sort((a, b) => +a.id - +b.id)

      // console.log('orders.value', orders.value)
    const getOrders = async () => {
      orders.value = (await getCollectionDocs('orders')).sort((a, b) => +a.id - +b.id)
    }
    getOrders()
    // setTimeout(async () => {
    //   orders.value = (await getCollectionDocs('orders')).sort((a, b) => +a.id - +b.id)
    //   // userCount.value = await getDocCount('users')
    //   console.warn('orders.value', orders.value)
    // }, 0);

    return {
      orders
    }
  }
}