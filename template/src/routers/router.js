import store from '@/store';
import Vue from 'vue';
import Router from 'vue-router';
//? Auth
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
//? Main
import Main from '@/components/Main.vue';
//! Modules
import studentRouter from './Student/student_router';
import teacherRouter from './Teacher/teacher_router';

//? Views
import Settings from '@/views/Pages/Settings.vue';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Main,
			redirect: () => {
				if(store.state.user){
					switch (store.state.user.role) {
						case 'student':
							return {name: 'studentPassedTests'};
						case 'teacher':
							return {name: 'teacherResults'};
					}
				}else{
					return {name: 'login'};
				}
			},
			children: [
				...studentRouter,
				...teacherRouter,
				{
					path: '/settings',
					name: 'settings',
					component: Settings,
				},
			],
			meta: {
				requaresAuth: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
		},
	]
});

router.beforeEach((to, from, next) => {
	const requaresAuth = to.matched.some(record => record.meta.requaresAuth);
	const currentUser = store.state.token;
	if (requaresAuth && !currentUser) {
		next('/login');
	} else if (requaresAuth && currentUser) {
		next();
	} else {
		next();
	}
});

export default router;
