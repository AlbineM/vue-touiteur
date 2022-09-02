//IMPORTS
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        children: [
            {
                path: '',
                name: 'SendMessageForm', //Correspond à la propriété "name" définie dans le composant SendMessageForm
                component: () => import('../subviews/SubviewSendMessageForm.vue')
            },
            {
                path: 'auth',
                name: 'AuthenticationSubview',
                component: () => import('../subviews/SubviewAuthentication.vue')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;