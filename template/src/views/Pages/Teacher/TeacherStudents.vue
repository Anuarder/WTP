<template>
    <v-content>
        <v-container>
            <teacher-students-component
                :students="students"
                action="Отправить тест"
                deleteStudent
                @handleClick="sendTestToStudents"
                @deleteClick="deleteStudent">
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
        async deleteStudent(){
            try{
                // TODO: Удалить студента у учителя
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
