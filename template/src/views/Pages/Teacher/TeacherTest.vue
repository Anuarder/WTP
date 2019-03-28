<template>
    <v-content>
        <v-container>
            <teacher-tests-component
                @handleClick="openStudentsDialog">
            </teacher-tests-component>
            <v-dialog v-model="dialog" max-width="800">
                <teacher-students-component
                    v-if="dialog"
                    :students="students"
                    action="Отправить"
                    @handleClick="sendTestToStudents">
                </teacher-students-component>
            </v-dialog>
        </v-container>
    </v-content>
</template>
<script>
//TODO: Изменить вид на таблицы
import TeacherServices from '@/services/Teacher'
import TeacherTestsComponent from './components/TeacherTestsComponent'
export default {
    components: {
        TeacherTestsComponent,
        TeacherStudentsComponent: () => import('./components/TeacherStudentsComponent')
    },
    data(){
        return{
            students: [],
            dialog: false,
            selectedTests: []
        }
    },
    created(){
        this.getTeacherStudents();
    },
    methods: {
        async getTeacherStudents(){
            try{
                let response = await TeacherServices.getTeacherStudents();
                this.students = response.data.students;
            }catch(err){
                console.log(err);
            }
        },
        openStudentsDialog(test){
            this.dialog = true;
            this.selectedTests = test;
        },
        async sendTestToStudents(students){
            try{
                let confirmSend = confirm("Отправить тесты?");
                if(confirmSend){
                    let response = await TeacherServices.sendTestToStudents({
                        tests: this.selectedTests,
                        students: students
                    });
                    if(response.data.message){
                        alert("Тест отправлены");
                        this.dialog = false;
                    }else{
                        alert("Тест не отправлены");
                        this.dialog = false;
                    }
                }else{
                    alert("Отмена отправки");
                    this.dialog = false;
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
