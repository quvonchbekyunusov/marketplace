import axios from 'axios';

const API_BASE_URL = 'http://market.zetsoft.uz/rest';

class OrderApi {
  // eslint-disable-next-line class-methods-use-this
  async create(resourceName, checkoutItems, cardItems) {
    const { data: order } = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/${resourceName}/create.aspx`,
      headers: {
        content_type: 'application/json; charset=UTF-8',
      },
      data: {
        user_id: checkoutItems.userId,
        contact_name: checkoutItems.userName,
        contact_phone: checkoutItems.userPhone,
        place_adress_id: 71,
      },
    });

    if (!order) {
      throw new Error('Order not created');
    }

    for (const cardItem of cardItems) {
      await axios({
        method: 'POST',
        url: `${API_BASE_URL}/shop-order-item/create.aspx`,
        data: {
          shop_order_id: order.id,
          shop_catalog_id: cardItem.offerId,
          amount: cardItem.quantity,
        },
      });
    }
  }
}

export default new OrderApi();
