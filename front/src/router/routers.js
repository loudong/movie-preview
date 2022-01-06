export const privateRouters = [{
    path: '/nav1',
    component: () => import('/src/containers/nav1')
}, {
    path: '/nav2',
    component: () => import('/src/containers/nav2')
},{
    path: '/nav3',
    component: () => import('/src/containers/nav3')
}]

export const publicRouters = [{
    path: '/login',
    component: () => import('/src/containers/login')
}]