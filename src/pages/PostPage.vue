<template>
  <div>
    <h1>Post Page</h1>
    <MyInput v-model="searchQuery" placeholder="Search..." />
    <div class="app-btn">
      <MyButton @click="showModal">Create Post</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <Modal v-model:show="modalVisible">
      <PostForm @create="createPost" />
    </Modal>
    <PostList
      v-if="!isLoading"
      :posts="sortedAndSearchedPost"
      @remove="removePost"
    />
    <div v-else>Loading</div>
    <div class="page__wrapper">
      <div
        v-for="pageNum in totalPages"
        :key="pageNum"
        class="page"
        :class="{ 'current-page': page === pageNum }"
        @click="changePage(pageNum)"
      >
        {{ pageNum }}
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      modalVisible: false,
      isLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "By name" },
        { value: "body", name: "By content" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.modalVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id);
    },
    showModal() {
      this.modalVisible = true;
    },
    changePage(pageNum) {
      this.page = pageNum;
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPost() {
      return this.sortedPost.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    page() {
      this.fetchPosts();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app-btn {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  border-radius: 30px;
  padding: 5px;
  cursor: pointer;
  margin-left: 3px;
}
.current-page {
  border: 2px solid teal;
  color: teal;
}
</style>
