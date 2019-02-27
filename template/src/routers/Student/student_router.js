import store from '@/store'

import StudentStatistics from '@/views/Pages/Student/StudentStatistics'
import StudentTest from '@/views/Pages/Student/StudentTest'

export default[
    {
        path: '/student-statistics',
        name: 'studentStatistics',
        component: StudentStatistics,
        beforeEnter(to, from, next){
            checkStudentRole(to, from, next)
        }
    },
    {
        path: '/student-test',
        name: 'studentTest',
        component: StudentTest,
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