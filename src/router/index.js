import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/home/HomeView.vue";
import ConvertView from "../views/convert/ConvertView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/convert',
            name: 'convert',
            component: ConvertView,
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ],
})
export default router