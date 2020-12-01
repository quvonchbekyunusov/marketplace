<template>
  <div>
    <q-layout class="q-pb-sm q-px-sm">
      <q-page-container>
        <form action="#!">
          <div class="text-body1 text_header">
            Выберите причину
          </div>
          <q-select
            v-model="model"
            color="grey-3"
            outlined
            label-color="dark"
            :options="options"
            label="Другое"
            hide-dropdown-icon
          >
            <template v-slot:append>
              <q-icon name="play_circle_filled" class="icon_rotate" />
            </template>
          </q-select>
          <textarea
            id=""
            v-model="textModel"
            class="rounded-borders"
            name=""
            cols="30"
            rows="10"
            placeholder="Напишите о проблеме"
          />
          <div class="row justify-end items-center">
            <q-btn
              color="primary"
              class="q-py-sm q-px-lg q-mt-lg text-right"
              label="Отправить"
              type="submit"
            />
          </div>
        </form>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  name: 'ReportProblem',
  data() {
    return {
      model: null,
      textModel: '',
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
  .q-page-container {
    max-width: 1140px;
    height: auto;
    margin: auto;
  }

  .text_header {
    color: #333;
    margin-bottom: 14px;
    margin-top: 18px;
  }

  .icon_rotate {
    transform: rotate(90deg);
    color: #828282;
  }

  textarea {
    width: 100%;
    resize: none;
    margin-top: 28px;
    padding: 10px;
    border: 1px solid #21BA45;
    height: 130px;
    transition: 0.3s;

    &:focus {
      outline: none !important;
      border: 1px solid #21BA45;
    }
  }

  @media (max-width: 320px) {
    .justify-end {
      justify-content: center !important;
    }
  }
</style>
