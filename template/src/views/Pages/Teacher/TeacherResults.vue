<template>
    <v-content>
        <v-container>
            <div class="student-results">
                <v-text-field
                    v-model="searchStudent"
                    append-icon="search"
                    label="Поиск по студентам"
                    single-line
                    hide-details>
                </v-text-field>
                <div class="students mt-5">
                    <div
                        v-for="item in filterStudents"
                        :key="item._id" 
                        class="student mt-3 elevation-5">
                        <v-card class="elevation-0">
                            <v-card-title primary-title>
                                <div>
									<h3 class="title mb-3">
										Имя:<span class="ml-2 text-capitalize">{{item.name}}</span>
									</h3>
									<h3 class="title mb-3">
										Email:<span class="ml-2">{{item.email}}</span>
									</h3>
								</div>
                            </v-card-title>
                            <v-card-text>
                                <h3 class="title">Результаты</h3>
                                <div class="test-results">
                                    <div
                                        v-for="(test, i) in item.testResults"
                                        :key="i"
                                        class="test-result mt-3">
                                        <div>
                                            <h3 class="title mb-2">
                                            {{i+1}}) {{test.name}}
                                            </h3>
                                            <div class="test-title">
                                                Время:
                                                <span class="font-weight-bold">
                                                    {{test.time}} минут
                                                </span> 
                                            </div>
                                            <div class="test-title">
                                                Результат:
                                                <span 
                                                    class="font-weight-bold"
                                                    :class="test.result < 50 ? 'red--text' : 'green--text'">
                                                    {{test.result}}%
                                                </span>
                                            </div>
                                            <div class="test-title">
                                                Дата сдачи:
                                                <span class="font-weight-bold">
                                                    {{test.date}}
                                                </span>
                                            </div>
                                            <v-btn 
                                                @click="openTestDialog(test)"
                                                color="primary" 
                                                small 
                                                class="ma-0 mt-1 text-none">
                                                Подробнее
                                            </v-btn>
                                        </div>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </div>
            <v-dialog v-model="dialog" max-width="900" scrollable>
                <v-card>
                    <v-card-title>
                        <div>
							<h3 class="headline mb-3">
                                {{currentTest.name}}
							</h3>
							<div class="test-title">
								Время: 
                                <span class="font-weight-bold">
                                    {{currentTest.time}} минут
                                </span> 
							</div>
							<div class="test-title">
								Результат: 
                                <span 
                                    class="font-weight-bold"
                                    :class="currentTest.result < 50 ? 'red--text' : 'green--text'">
                                    {{currentTest.result}}%
                                </span>
							</div>
							<div class="test-title">
								Дата сдачи: 
                                <span class="font-weight-bold">
                                    {{currentTest.date}}
                                </span>
							</div>
                            <div class="text-title mt-2">
                                <div class="red--text">Неверный</div>
                                <div class="green--text">Верный</div>
                                <div class="blue--text">Ответ</div>
                            </div>
						</div>
                    </v-card-title>
                    <v-card-text>
                        <div class="test">
                            <div class="test-item" v-for="(question, i) in currentTest.questions" :key="i">
                                <div>
                                    <h2 class="title">{{question.question}} ?</h2>
                                    <v-list>
                                        <v-list-tile avatar v-for="(answer, j) in question.answers" :key="j">
                                            <v-list-tile-title
                                                class="answer"
                                                :class="{
                                                    'red--text': answer.isSelected && !answer.isAnswer,
                                                    'blue--text': answer.isAnswer,
                                                    'green--text': answer.isSelected && answer.isAnswer, 
                                                }">
                                                {{j+1}}) {{answer.answer}}
                                            </v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </v-content>
</template>
<script>
import TeacherServices from '@/services/Teacher'
export default {
    data(){
        return{
            students: [],
            searchStudent: '',
            currentTest: [],
            dialog: false
        }
    },
    computed:{
        filterStudents(){
            if(this.searchStudent === ''){
                return this.students;
            }else{
                return this.students.filter(item => {
                    if(item.name.toLowerCase().indexOf(this.searchStudent.toLowerCase()) !== -1){
                        return item;
                    }
                });
            }
        }
    },
    created(){
        this.getStudents();
    },
    methods: {
        async getStudents(){
            try{
                let response = await TeacherServices.getTeacherStudents();
                this.students = response.data.students;
                console.log(this.students)
            }catch(err){
                console.log(err);
            }
        },
        openTestDialog(test){
            this.dialog = true;
            this.currentTest = test;
        }
    }
}
</script>
