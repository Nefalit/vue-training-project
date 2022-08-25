<template>
  <div>
    <h1>Post Page</h1>
    <MyInput v-model="searchQuery" placeholder="Search..." />
    <div class="app-btn">
      <MyButton>Create Post</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <Modal v-model:show="modalVisible">
      <PostForm />
    </Modal>
    <PostList
      v-if="!isLoading"
      :posts="sortedAndSearchedPost"
    />
    <div v-else>Loading</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import useSortedPost from "@/hooks/useSortedPost.js";
import usePosts from "@/hooks/usePosts.js";
import useSortedAndSearchedPost from "@/hooks/useSortedAndSearchedPost.js";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      modalVisible: false,
      sortOptions: [
        { value: "title", name: "By name" },
        { value: "body", name: "By content" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPost(posts);
    const { searchQuery, sortedAndSearchedPost } =
      useSortedAndSearchedPost(sortedPosts);

    return {
      posts,
      totalPages,
      isLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPost,
    };
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

</style>
