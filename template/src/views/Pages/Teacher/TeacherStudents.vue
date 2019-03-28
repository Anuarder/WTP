<template>
    <v-content>
        <v-container>
            <teacher-students-component
                :students="students"
                action="Отправить тест"
                deleteStudents
                @handleClick="sendTestToStudents"
                @deleteClick="deleteTeacherStudents">
            </teacher-students-component>
        </v-container>
    </v-content>
</template>
<script>
import TeacherStudentsComponent from './components/TeacherStudentsComponent'
import TeacherServices from '@/services/Teacher'
export default {
    components: {
        TeacherStudentsComponent
    },
    data(){
        return{
            students: [],
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
        sendTestToStudents(){
            //TODO: Вытащить тесты ввиде таблицы
        }
    }
}
</script>
<style scoped>
.students-table td, th{
    font-size: 1.2rem;
}
</style>
