<template>
    <v-content>
        <v-container>
            <teacher-students-component
                :students="students"
                action="Добавить"
                @handleClick="addStudents">
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
        this.getAllStudents();
    },
    methods:{
        async getAllStudents(){
            try{
                let response = await TeacherServices.getAllStudents();
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
        async addStudents(selectedStudents){
            try{
                let addConfirm = confirm("Добавить студентов?");
                if(addConfirm){
                    let response = await TeacherServices.addStudents({
                        students: selectedStudents
                    });
                    if(response.data.message){
                        alert('Студенты добавленны');
                    }else{
                        alert('Ошибка добавления');
                    }
                }else{
                    alert("Отмена");
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
