import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/library",
      name: "library",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LibraryView.vue"),
    },
    {
      path: "/authors",
      name: "authors",
      component: () => import("../views/AuthorsView.vue"),
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/CoursesView.vue"),
    },
    {
      path: "/course/:id",
      name: "course",
      component: () => import("../views/CourseView.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/subscription",
      name: "subscription",
      component: () => import("../views/SubscriptionView.vue"),
    },
    {
      path: "/:catchall(.*)*",
      name: "not found",
      component: () => import("../views/404View.vue"),
    },
  ],
});

export default router;
