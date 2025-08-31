import { getCookieServer } from '@/lib/cookieServer';
import {Orders} from './components/orders';
import { api } from '@/services/api';
import { OrderPropos } from '@/lib/order.type';

async function getOrders(): Promise<OrderPropos[] | []> {
  try {
    const token = await getCookieServer();

    const response = await api.get('/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || [];

  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Dashboard(){

  const orders = await getOrders();
  console.log(orders);

  return(
    <>
      <Orders order={orders} />
    </>
  )
}