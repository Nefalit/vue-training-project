<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="nav_title">Vue 3 training</div>
    <div class="nav__btn">
      <MyButton @click="$router.push('/posts')">Posts</MyButton>
      <MyButton @click="$router.push('/about')" style="margin-left: 5px"
        >About</MyButton
      >
      <MyButton @click="$router.push('/composition')" style="margin-left: 5px"
        >Composition Posts</MyButton
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: bisque;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.nav__btn {
  margin-left: auto;
}
.nav_title {
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
}
</style>
