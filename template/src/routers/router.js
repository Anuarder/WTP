import store from '@/store'
import Vue from 'vue'
import Router from 'vue-router'
//? Auth
import Login from '@/views/Auth/Login.vue'
//? Main
import Main from '@/components/Main.vue'
//! Modules
import studentRouter from './Student/student_router'
import teacherRouter from './Teacher/teacher_router'
import adminRouter from './Admin/admin_router'

//? Views
import Settings from '@/views/Pages/Settings.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Main,
            redirect:  () => {
                switch(store.state.user.role){
                    case 'student': 
                        return {name: 'courses'};
                    case 'teacher': 
                        return {name: 'teacherCourses'};
                    case 'admin':
                        return {name: 'edit'}
                }
            },
            children:[
                ...studentRouter,
                ...teacherRouter,
                ...adminRouter,
                {
                    path: '/settings',
                    name: 'settings',
                    component: Settings,
                },
            ],
            meta:{
                requaresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {
    const requaresAuth = to.matched.some(record => record.meta.requaresAuth);
    const currentUser = store.state.token;
    if(requaresAuth && !currentUser){
        next('/login');
    }else if(requaresAuth && currentUser){
        next();
    }else{
        next();
    }
});

export default router;