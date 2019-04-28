<template>
    <v-content>
        <v-container>
			<div v-if="!loading">
				<v-layout row wrap v-if="passedTest.length !== 0">
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
                                        <div class="blue--text">Ответ</div>
                                        <div class="green--text">Верный</div>
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
					<v-flex xs12 md4 v-for="(test, i) in passedTest" :key="i">
						<v-card class="mt-3 mr-3 elevation-4" >
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-3">
                                        {{test.name}}
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
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn 
									dark 
									color="success" 
									@click="openTestDialog(test)">
									ответы
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
				<div v-else>
					<h1 class="display-1">
						У вас отсутсвуют результаты
					</h1>
				</div>
			</div>
			<div v-else class="loading">
				<h1 class="display-1">
					Загрузка...
				</h1>
			</div>
		</v-container>
    </v-content>
</template>
<script>
import StudentServices from '@/services/Student'
export default {
    data(){
        return{
            passedTest: [],
            loading: false,
            currentTest: {},
            dialog: false,
        }
    },
    created(){
        this.getPassedTest();
    },
    methods: {
        async getPassedTest(){
            try{
                this.loading = true;
                let response = await StudentServices.getPassedTests();
                this.passedTest = response.data.tests;
                this.passedTest.reverse();
                this.loading = false;
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
<style scoped>
.test-title{
    font-weight: 500;
    font-size: 1.2rem;
}
</style>
