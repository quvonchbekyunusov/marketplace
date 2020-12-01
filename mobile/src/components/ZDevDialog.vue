<template>
  <q-dialog v-bind="$attrs" v-on="$listeners">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          В разработке ...
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Эта функция находится в разработке
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="OK" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ZDevDialog',
};
</script>
