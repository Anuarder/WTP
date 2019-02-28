import store from '@/store'

import TeacherStatistics from '@/views/Pages/Teacher/TeacherStatistics'
import TeacherTest from '@/views/Pages/Teacher/TeacherTest'
import TeacherCreateTest from '@/views/Pages/Teacher/TeacherCreateTest'
import TeacherCreateGroup from '@/views/Pages/Teacher/TeacherCreateGroup'
import TeacherGroups from '@/views/Pages/Teacher/TeacherGroups'

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
        path: '/teacher-create-group',
        name: 'teacherCreateGroup',
        component: TeacherCreateGroup,
        beforeEnter(to, from, next){
            checkTeacherRole(to, from, next)
        }
    },
    {
        path: '/teacher-groups',
        name: 'teacherGroups',
        component: TeacherGroups,
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