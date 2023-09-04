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
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/playground/authors",
      name: "adminAuthors",
      component: () => import("../views/AdminViewAuthors.vue"),
    },
    // {
    //   path: "/playground/courses",
    //   name: "admin",
    //   component: () => import("../views/AdminViewCourses.vue"),
    // },
    // {
    //   path: "/playground/quizzes",
    //   name: "admin",
    //   component: () => import("../views/AdminViewQuizzes.vue"),
    // },
    // {
    //   path: "/playground/subscriptions",
    //   name: "admin",
    //   component: () => import("../views/AdminViewSubscriptions.vue"),
    // },
    // {
    //   path: "/playground/ratings",
    //   name: "admin",
    //   component: () => import("../views/AdminViewRatings.vue"),
    // },
    // {
    //   path: "/playground/media",
    //   name: "admin",
    //   component: () => import("../views/AdminViewMedia.vue"),
    // },
    // {
    //   path: "/playground/enrollments",
    //   name: "admin",
    //   component: () => import("../views/AdminViewEnrollments.vue"),
    // },
    {
      path: "/playground",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/library",
      name: "library",
      component: () => import("../views/LibraryView.vue"),
    },
    {
      path: "/authors",
      name: "authors",
      component: () => import("../views/AuthorsView.vue"),
    },
    {
      path: "/course/author/:id",
      name: "coursesAuthor",
      component: () => import("../views/AuthorsCoursesView.vue"),
    },
    {
      path: "/course/tag/:value",
      name: "coursesTag",
      component: () => import("../views/TagCoursesView.vue"),
    },
    {
      path: "/course/:id",
      name: "course",
      component: () => import("../views/CourseView.vue"),
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/CoursesView.vue"),
    },
    {
      path: "/lesson/:id",
      name: "lesson",
      component: () => import("../views/LessonView.vue"),
    },
    {
      path: "/quiz/:id",
      name: "quiz",
      component: () => import("../views/QuizView.vue"),
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
