<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-card class="mt-3" v-for="(test, i) in tests" :key="i">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{test.test.name}}</h3>
                <div>Время: {{test.test.time}} минут</div>
                <div class="green--text" v-if="test.isPassed">Пройден</div>
                <div class="red--text" v-else>Не пройден</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn dark color="teal" @click="openTestDialog(test)">Пройти тест</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog persistent v-model="dialog" max-width="1000">
      <v-card>
        <v-card-title class="headline blue-grey darken-1" primary-title>
          <span class="white--text">{{currentTest.name}}</span>
        </v-card-title>
        <v-card-text>
          <!--
                    //?   Как же сделать, 
                    //?   vuetify скорее всего не поможет  
                    //?   и нужно при нажатии на 'следующий', записывать ответ на вопрос в массив.
          -->
          <v-carousel light interval="100000" hide-delimiters>
            <v-carousel-item v-for="(question, i) in currentTest.questions" :key="i">
              <div class="ma-4">
                <h2>{{question.question}}</h2>
                <v-list>
                  <v-list-tile avatar v-for="(answer, j) in question.answers" :key="j">
                    <v-list-tile-title @click="addAnswer(i, j)" class="answer">
                      {{j+1}}) {{answer.answer}}
                      <!--//!Работает только если начинать с первого вопроса и по порядку 
                      <span v-if="answers[i]">
                        <v-icon v-if="j == answers[i].answer" color="teal">check_circle</v-icon>
                      </span>-->
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="cancelTestPass()">Отмена</v-btn>
          <v-btn color="teal" dark @click="passTest()">Сдать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
import lodash from 'lodash';
import StudentServices from '@/services/Student';
export default {
	data() {
		return {
			tests: [],
			dialog: false,
			currentTest: [],
			answers: [], //! Отправляется вопрос и ответ на него. {question: '', answer: ''}
			time: 0,
		};
	},
	created() {
		this.getStudentTests();
	},
	methods: {
		async getStudentTests() {
			try {
				let response = await StudentServices.getStudentTests();
				if (response.data.tests) {
					this.tests = response.data.tests;
				} else {
					console.log('Get student test error');
					this.getStudentTests();
				}
			} catch (err) {
				console.log(err);
			}
		},
		addAnswer(question, answer) {
			let data = {
				question: question,
				answer: answer,
			};
			let index = lodash.findIndex(this.answers, el => {
				return el.question == data.question;
			});
			if (index == -1) {
				this.answers.push(data);
			} else {
				this.answers[index] = data;
			}
			this.answers.sort((a, b) => {
				if (a.question > b.question) {
					return 1;
				} else if (a.question < b.question) {
					return -1;
				} else {
					return 0;
				}
			});
			console.log(this.answers);
		},
		openTestDialog(test) {
			this.dialog = true;
			this.currentTest = test.test;
			this.time = test.test.time; // Время для сдачи теста
			console.log(this.answers);
		},
		cancelTestPass() {
			//TODO: Отмена счетчика времени и ответов на тест
			this.dialog = false;
			this.answers = [];
		},
		passTest() {
			//TODO: Тест проверяется и проходится на фронте и отправляется только результат
			let correct = [];
			let incorrect = [];
            
			let currentTestQuestions = this.currentTest.questions;
			for (let i = 0; i < currentTestQuestions.length; i++) {
                // Проверка ответа
                let answer = currentTestQuestions[i].answers[this.answers[i].answer].isAnswer
                if(answer){
                    correct.push(this.answers[i])
                }else{
                    incorrect.push(this.answers[i])
                }
            }
            console.log(correct);
            console.log(incorrect);
            console.log({
                result: {
                    correct: correct.length,
                    incorrect: incorrect.length
                }
            });
		},
	},
};
</script>
<style lang="stylus" scoped>
.answer {
  cursor: pointer;

  &:hover {
    color: #00897B;
    transition: 0.2s;
  }

  &-active {
    color: #00897B !important;
  }
}
</style>
