<template>
  <div>
    <div v-if="isLoading" :key="loading">
      <q-spinner size="sm" />
    </div>
    <div v-else :key="ready">
      <q-card class="q-ma-lg  q-pa-md">
        <div class="row flex justify-between items-center">
          <div class="">
            <p class="text-bold text-caption">
              Покупка от {{ $d(order.createdAt, 'short') }}
            </p>
            <h6 class="id q-mt-sm text-caption">
              ID заказа: {{ order.id }}
            </h6>
          </div>
        </div>
        <z-order-block-body :status="order.status" :images="images" />
        <div class="row items-center justify-between q-mt-md">
          <div>
            <p class="amount">
              Количество: {{ order.items.length }}
            </p>
          </div>
          <div class="flex btnsWrapper justify-between">
            <q-btn
              class="details q-mr-sm"
              size="md"
              no-caps
              label="Детали заказа"
              :to="{ name: 'order', params: { id: order.id } }"
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZOrderBlockBody from '@/components/ZOrderBlockBody';

export default {
  name: 'ZOrderBlock',
  components: {
    ZOrderBlockBody,
  },
  props: {
    order: VueTypes.object.isRequired,
  },
  data() {
    return {
      images: null,
      isLoading: true,
    };
  },
  async created() {
    this.images = await this.order.items.map((item) => item.offer.product.images[0]);
    this.isLoading = false;
  },
};
</script>

<style scoped>
  .date {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #828282;
    text-align: end;
  }

  .total {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #4f4f4f;
  }

  .id {
    font-weight: 500;
    color: #4f4f4f;
  }

  .details {
    border: 1px solid #27ae60;
  }

  .details, .bought {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #27ae60;
    border-radius: 4px;
  }

  .amount {
    font-size: 14px;
    line-height: 16px;
    color: #828282;
  }

  .deliviring, .bought, .denied {
    font-weight: 500;
    font-size: 14px;
    line-height: 34px;
    text-align: center;
    border-radius: 4px;
  }

  .denied {
    color: #eb5757;
  }

  .deliviring {
    color: #ffb753;
  }

  .btn {
    width: 7rem;
  }

  @media only screen and (max-width: 320px) {
    .btnsWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .details, .bought, .deliviring, .denied {
      width: 50%;
      margin: 0;
      padding: 0;
    }

    .details {
      margin-bottom: 5%;
    }
  }
</style>
