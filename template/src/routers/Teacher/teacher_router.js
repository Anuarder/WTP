import store from '@/store'

import TeacherCourses from '@/views/Pages/Teacher/TeacherCourses'
import TeacherTest from '@/views/Pages/Teacher/TeacherTest'
import TeacherTasks from '@/views/Pages/Teacher/TeacherTasks'
import TeacherGrade from '@/views/Pages/Teacher/TeacherGrade'
import TeacherChat from '@/views/Pages/Teacher/TeacherChat'

export default [
    {
        path: '/teacher-courses',
        name: 'teacherCourses',
        component: TeacherCourses,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    },
    {
        path: '/teacher-test',
        name: 'teacherTest',
        component: TeacherTest,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    },
    {
        path: '/teacher-tasks',
        name: 'teacherTasks',
        component: TeacherTasks,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    },
    {
        path: '/teacher-grade',
        name: 'teacherGrade',
        component: TeacherGrade,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    },
    {
        path: '/teacher-chat',
        name: 'teacherChat',
        component: TeacherChat,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    }
]

function checkTeacherRole(to, from, next){
    if(store.state.user.role == 'teacher'){
        next();
    }else{
        next(false)
    }
}