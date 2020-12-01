<template>
  <div class="flex q-mb-lg">
    <q-avatar v-if="user.avatar.length" class="flex self-center avatar" size="80px">
      <img
        :src="user.avatar"
        class="avatar-image"
        :alt="user.name"
      >
    </q-avatar>
    <q-avatar v-else color="primary" size="80px" text-color="white">
      {{ user.name.charAt(0) }}
    </q-avatar>
    <div class="user-info q-px-md text-left">
      <p class="text-caption text-grey-7">
        ID: {{ user.id }}
      </p>
      <p class="text-h5 text-weight-medium">
        {{ user.name }}
      </p>
      <p>
        {{ user.email }}
      </p>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ProfileHeader',
  props: {
    user: VueTypes.shape({
      id: VueTypes.id,
      name: VueTypes.string.isRequired,
      avatar: VueTypes.string.isRequired,
      email: VueTypes.string.isRequired,
    }).isRequired,
  },
};
</script>

<style lang="scss" scoped>
  .avatar {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25)
  }

  .avatar-image {
    border: 8px solid #ffffff;
  }

</style>
