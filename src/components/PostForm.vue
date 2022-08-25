<template>
  <form @submit.prevent>
    <MyInput v-model="post.title" type="text" placeholder="Название" />
    <MyInput v-model="post.body" type="text" placeholder="Описание" />
    <MyButton class="formBtn" @click="createPost">Create</MyButton>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
        id: "",
      };
    },
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
.formBtn {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
