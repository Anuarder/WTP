import store from '@/store'

import StudentActiveTests from '@/views/Pages/Student/StudentActiveTests'
import StudentPassedTests from '@/views/Pages/Student/StudentPassedTests'

export default[
    {
        path: '/student-active-tests',
        name: 'studentActiveTests',
        component: StudentActiveTests,
        beforeEnter(to, from, next){
            checkStudentRole(to, from, next)
        }
    },
    {
        path: '/student-passed-tests',
        name: 'studentPassedTests',
        component: StudentPassedTests,
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