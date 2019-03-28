<template>
    <v-content>
        <v-container>
            <teacher-students-component
                :students="students"
                action="Отправить тест"
                deleteStudents
                @handleClick="openTestDialog"
                @deleteClick="deleteTeacherStudents">
            </teacher-students-component>
            <v-dialog v-model="dialog" max-width="800">
                <teacher-test-component 
                    v-if="dialog"
                    modal
                    @handleClick="sendTestToStudents">
                </teacher-test-component>
            </v-dialog>
        </v-container>
    </v-content>
</template>
<script>
import TeacherStudentsComponent from './components/TeacherStudentsComponent'
import TeacherServices from '@/services/Teacher'
export default {
    components: {
        TeacherStudentsComponent,
        TeacherTestComponent: () => import('./components/TeacherTestsComponent')
    },
    data(){
        return{
            dialog: false,
            students: [],
            selectedStudents: []
        }
    },
    created(){
        this.getTeacherStudents();
    },
    methods: {
        async getTeacherStudents(){
            try{
                let response = await TeacherServices.getTeacherStudents();
                this.students = response.data.students.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
            }catch(err){
                console.log(err);
            }
        },
        async deleteTeacherStudents(students){
            try{
                let deleteConfirm = confirm("Удалить студентов?");
                if(deleteConfirm){
                    let response = await TeacherServices.deleteTeacherStudents({
                        students: students
                    });
                    if(response.data.message){
                        alert("Студенты удаленны");
                        this.getTeacherStudents();
                    }else{
                        alert("Ошибка");
                    }
                }else{
                    alert("Удаление отмененно");
                }
            }catch(err){
                console.log(err);
            }
        },
        openTestDialog(selectedStudents){
            this.dialog = true;
            this.selectedStudents = selectedStudents;
        },
        async sendTestToStudents(tests){
            try{
                let sendPrompt = confirm("Отправить тесты?");
                if(sendPrompt){
                    let response = await TeacherServices.sendTestToStudents({
                        tests: tests,
                        students: this.selectedStudents
                    });
                    if(response.data.message){
                        alert("Тесты отправленны");
                        this.dialog = false;
                    }else{
                        alert("Ошибка");
                        this.dialog = false;
                    }
                }else{
                    alert("Отмена");
                    this.dialog = false;
                }
                
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
<style scoped>
.students-table td, th{
    font-size: 1.2rem;
}
</style>
