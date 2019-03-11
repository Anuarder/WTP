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
          <v-spacer></v-spacer>
          <v-btn depressed color="pink darken-1" dark v-if="isPass">{{result}}</v-btn>
          <v-btn flat dark v-else>Время {{currentTime.min}}:{{currentTime.sec}}</v-btn>
        </v-card-title>
        <v-card-text>
          <v-carousel light hide-delimiters>
            <v-carousel-item v-for="(question, i) in answers" :key="i">
              <div class="ma-4">
                <h2>{{question.question}}</h2>
                <v-list v-if="isPass">
                  <v-list-tile avatar v-for="(answer, j) in question.answers" :key="j">
                    <v-list-tile-title
                      @click="answer.isSelected = !answer.isSelected"
                      class="answer"
                      :class="{'answer-active': answer.isSelected, 'isAnswer': currentTest.questions[i].answers[j].isAnswer}"
                    >{{j+1}}) {{answer.answer}}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list v-else>
                  <v-list-tile avatar v-for="(answer, j) in question.answers" :key="j">
                    <v-list-tile-title
                      @click="answer.isSelected = !answer.isSelected"
                      class="answer"
                      :class="{'answer-active': answer.isSelected}"
                    >{{j+1}}) {{answer.answer}}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" v-if="isPass" flat @click="cancelTestPass()">Закрыть</v-btn>
          <v-btn color="error" v-if="!isPass" flat @click="cancelTestPass()">Отмена</v-btn>
          <v-btn color="teal" v-if="!isPass" dark @click="checkTest()">Сдать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
import StudentServices from '@/services/Student';
export default {
	data() {
		return {
			tests: [],
			dialog: false,
			currentTest: [],
			currentTime: 0,
			answers: [],
			isPass: false,
			result: '',
		};
	},
	created() {
		this.getStudentTests();
	},
	methods: {
		async getStudentTests() {
			//TODO: Если тест уже пройден, вывести время за которое он пройден, и кол-во правильных и неправильных ответов
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
		openTestDialog(test) {
			this.dialog = true;
			this.currentTest = test.test;
			let data = [];
			for (let question of this.currentTest.questions) {
				let answers = [];
				for (let answer of question.answers) {
					answers.push({
						answer: answer.answer,
						isSelected: false,
					});
				}
				data.push({
					question: question.question,
					answers: answers,
				});
			}
			console.log(data);
			this.answers = data;

			//* Счетчик теста
			this.currentTime = {
				min: test.test.time,
				sec: 0,
			};
			//Логика работы счетчика
			let currentTimeInterval = setInterval(() => {
				if (this.currentTime == 0) {
					clearInterval(currentTimeInterval);
				} else if (this.currentTime.sec == 0 && this.currentTime.min == 0) {
					clearInterval(currentTimeInterval);
					this.timeOver();
				} else if (this.currentTime.sec == 0) {
					this.currentTime.min -= 1;
					this.currentTime.sec = 59;
				} else {
					this.currentTime.sec -= 1;
				}
			}, 1000);
		},
		cancelTestPass() {
			this.dialog = false;
			this.currentTest = [];
			this.answers = [];
			this.currentTime = 0;
			this.isPass = false;
		},
		timeOver() {
			alert('Время потраченно');
			this.checkTest();
		},
		checkTest() {
			let questions = this.currentTest.questions;
			let data = [];
			let isAnswerVal = 0;
			let correctAnswer = 0;

			for (let i = 0; i < questions.length; i++) {
				let answer = 0;
				for (let j = 0; j < questions[i].answers.length; j++) {
					let isSelected = this.answers[i].answers[j].isSelected;
					let isAnswer = questions[i].answers[j].isAnswer;
					if (isAnswer) {
						isAnswerVal++; //Запись общих баллов
					}
					if (isSelected && isAnswer) {
						answer++;
					} else if (!isSelected && isAnswer) {
						answer--;
						if (answer < 0) {
							answer = 0;
						}
					}
					// isSelected == false && isAnswer == false  || isSelected == true && isAnswer == false ||
				}
				data.push({
					question: i,
					answer: answer,
				});
				correctAnswer += answer;
			}
			this.result = `Баллов ${correctAnswer} из ${isAnswerVal}`;
			this.isPass = true;
			this.passTest(data);
		},
		passTest(data) {
			//TODO: Отправить данные на сервер и проверить и записать и отправить
			console.log(data);
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
    font-weight: 600;
    color: #193FFF !important;
  }
}

.isAnswer {
  font-weight: 600;
  color: #F82A84 !important;
}
</style>
