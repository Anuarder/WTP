import store from '@/store'
import Edit from '@/views/Pages/Admin/Edit'
import CreateUser from '@/views/Pages/Admin/CreateUser'
import CreateCourse from '@/views/Pages/Admin/CreateCourse'
import CreateGroup from '@/views/Pages/Admin/CreateGroup'

export default[
    {
        path: '/edit',
        name: 'edit',
        component: Edit,
        beforeEnter(to, from, next){
            checkAdminRole(to, from, next)
        }
    },
    {
        path: '/create-user',
        name: 'createUser',
        component: CreateUser,
        beforeEnter(to, from, next){
            checkAdminRole(to, from, next)
        }
    },
    {
        path: '/create-course',
        name: 'createCourse',
        component: CreateCourse,
        beforeEnter(to, from, next){
            checkAdminRole(to, from, next)
        }
    },
    {
        path: '/create-group',
        name: 'createGroup',
        component: CreateGroup,
        beforeEnter(to, from, next){
            checkAdminRole(to, from, next)
        }
    },
]

function checkAdminRole(to, from, next){
    if(store.state.user.role == 'admin'){
        next();
    }else{
        next(false)
    }
}