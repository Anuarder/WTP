import store from '@/store'

import TeacherStatistics from '@/views/Pages/Teacher/TeacherStatistics'
import TeacherTest from '@/views/Pages/Teacher/TeacherTest'

export default [
    {
        path: '/teacher-statistics',
        name: 'teacherStatistics',
        component: TeacherStatistics,
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
    }
]

function checkTeacherRole(to, from, next){
    if(store.state.user.role == 'teacher'){
        next();
    }else{
        next(false)
    }
}