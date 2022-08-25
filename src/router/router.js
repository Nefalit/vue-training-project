import Main from "@/pages/Main.vue";
import PostPage from "@/pages/PostPage.vue";
import About from "@/pages/About.vue";
import PostIdPage from "@/pages/PostIdPage.vue";
import PostPageComposition from "@/pages/PostPageComposition.vue"
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/composition",
    component: PostPageComposition,
  },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
