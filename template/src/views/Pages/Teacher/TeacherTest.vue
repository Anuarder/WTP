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
                                @click="sendTestToStudents(test)">
                                Отправить тест
                            </v-btn>
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
import TeacherServices from '@/services/Teacher'
export default {
    data(){
        return{
            tests: [],
            students: []
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
                console.log(this.tests);
            }catch(err){
                console.log(err);
            }
        },
        async deleteTest(test){
            try{
                let response = await TeacherServices.deleteTest({
                    test: test._id
                });
                this.getTeacherTests();
            }catch(err){
                console.log(err);
            }
        },
        async getTeacherStudents(){
            try{
                let response = await TeacherServices.getTeacherStudents();
                this.students = response.data.students;
                console.log(this.students);
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
