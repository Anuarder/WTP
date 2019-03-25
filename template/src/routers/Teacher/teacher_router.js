import store from '@/store'

import TeacherResults from '@/views/Pages/Teacher/TeacherResults'
import TeacherTest from '@/views/Pages/Teacher/TeacherTest'
import TeacherCreateTest from '@/views/Pages/Teacher/TeacherCreateTest'
import TeacherStudents from '@/views/Pages/Teacher/TeacherStudents'

export default [
    {
        path: '/teacher-results',
        name: 'teacherResults',
        component: TeacherResults,
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
        path: '/teacher-create-test',
        name: 'teacherCreateTest',
        component: TeacherCreateTest,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    },
    {
        path: '/teacher-students',
        name: 'teacherStudents',
        component: TeacherStudents,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    },
]

function checkTeacherRole(to, from, next){
    if(store.state.user.role == 'teacher'){
        next();
    }else{
        next(false)
    }
}