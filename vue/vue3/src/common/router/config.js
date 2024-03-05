/**
 * @file router config
 */

const routes = [
    {
        name: 'main',
        path: '/',
        component: () => import('src/Widget/Main/Index.vue')
    }, {
        name: 'note',
        path: '/note',
        component: () => import('src/Widget/Main/Index.vue')
    }
];

export default routes;