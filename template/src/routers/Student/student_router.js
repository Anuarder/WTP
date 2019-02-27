import store from '@/store'

import Courses from '@/views/Pages/Student/Courses'
import Test from '@/views/Pages/Student/Test'
import Tasks from '@/views/Pages/Student/Tasks'
import Grade from '@/views/Pages/Student/Grade'
import Chat from '@/views/Pages/Student/Chat'

export default[
    {
        path: '/courses',
        name: 'courses',
        component: Courses,
        beforeEnter(to, from, next){
            checkStudentRole(to, from, next)
        }
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
        beforeEnter(to, from, next){
            checkStudentRole(to, from, next)
        }
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        beforeEnter(to, from, next){
            checkStudentRole(to, from, next)
        }
    },
    {
        path: '/grade',
        name: 'grade',
        component: Grade,
        beforeEnter(to, from, next){
            checkStudentRole(to, from, next)
        }
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
        beforeEnter(to, from, next){
            checkStudentRole(to, from, next)
        }
    }
]

function checkStudentRole(to, from, next){
    if(store.state.user.role == 'student'){
        next();
    }else{
        next(false)
    }
}