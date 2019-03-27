<template>
    <v-content>
        <v-container>
            <v-layout 
                v-if="tests.length !== 0"
                row 
                wrap>
                <v-flex 
                    xs12 
                    md3 
                    v-for="(test, i) in tests" 
                    :key="i">
                    <v-card>
                        <v-card-title>
                            <h1 class="headline">{{test.name}}</h1>
                        </v-card-title>
                        <v-card-text>
                            Время: {{test.time}} мин.
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                small 
                                class="text-none" 
                                color="error"
                                @click="deleteTest(test)">
                                Удалить тест
                            </v-btn>
                            <v-btn
                                small 
                                class="text-none" 
                                color="success"
                                @click="dialog = true">
                                Отправить тест
                            </v-btn>
                            <v-dialog v-model="dialog" max-width="500">
                                <teacher-students-component></teacher-students-component>
                            </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <div v-else>
                <h1>Тесты отсутствуют</h1>
            </div>
        </v-container>
    </v-content>
</template>
<script>
//TODO: Изменить вид на таблицы
import TeacherStudentsComponent from './components/TeacherStudentsComponent'
import TeacherServices from '@/services/Teacher'
export default {
    components: {
        TeacherStudentsComponent
    },
    data(){
        return{
            tests: [],
            students: [],
            dialog: false,
        }
    },
    created(){
        this.getTeacherTests();
        this.getTeacherStudents();
    },
    methods: {
        async getTeacherTests(){
            try{
                let response = await TeacherServices.getTeacherTests();
                this.tests = response.data.tests;
            }catch(err){
                console.log(err);
            }
        },
        async deleteTest(test){
            try{
                let response = await TeacherServices.deleteTest({
                    test: test._id
                });
                if(response.data.message){
                    this.getTeacherTests();
                }else{
                    alert("Ошибка при удалении теста");
                }
            }catch(err){
                console.log(err);
            }
        },
        async getTeacherStudents(){
            try{
                let response = await TeacherServices.getTeacherStudents();
                this.students = response.data.students;
            }catch(err){
                console.log(err);
            }
        },
        async sendTestToStudents(test){
            try{
                let response = await TeacherServices.sendTestToStudents({
                    test: test,
                    students: this.students
                });
                if(response.data.message){
                    alert("Тест отправлен");
                }else{
                    alert("Тест не отправлен");
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
