<template>
  <v-content>
    <v-container>
      <div class="login-content">
        <h1 class="text-xs-center display-1 font-weight-light top-text">Добавить тест</h1>
        <div class="login-form">
          <v-form ref="testForm" @submit.prevent v-model="valid" class="mt-3 mb-3">
            <v-text-field
              label="Заголовок"
              solo
              class="login-input"
              :rules="nameRules"
              v-model="name"
              required
            ></v-text-field>
            <v-text-field
              label="Время"
              solo
              class="login-input"
              :rules="timeRules"
              v-model="time"
              required
              type="number"
              hint="Время для прохождения теста в минутах"
            ></v-text-field>
            <h2 class="mb-3">Вопросы</h2>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="(question, i) in questions" :key="i">
                <v-icon slot="actions" color="teal">keyboard_arrow_down</v-icon>
                <div slot="header" class="font-weight-medium">
                  Вопрос {{i+1}}
                  <v-btn icon small @click="deleteQuestion(i)">
                    <v-icon color="grey">delete</v-icon>
                  </v-btn>
                </div>
                <v-card color="blue-grey lighten-5">
                  <v-card-text>
                    <v-text-field :label="`${i+1} вопрос`" solo v-model="question.question"></v-text-field>
                    <div v-for="(answer, j) in question.answers" :key="j">
                      <v-text-field
                        :prepend-icon="answer.isAnswer ? 'check_circle' : 'highlight_off'"
                        :label="`${j+1} ответ`"
                        append-icon="delete"
                        solo
                        v-model="answer.answer"
                        @click:prepend="answer.isAnswer = !answer.isAnswer"
                        @click:append="deleteAnswer(i, j)"
                      ></v-text-field>
                    </div>
                    <v-btn small color="primary" @click="addAnswer(i)">Добавить ответ</v-btn>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-btn class="text-none mt-3" color="teal" dark @click="addQuestion">
              <v-icon left>note_add</v-icon>Добавить вопрос
            </v-btn>
          </v-form>
        </div>
        <hr class="mb-3">
        <v-btn dark @click="validate">Добавить тест</v-btn>
      </div>
    </v-container>
  </v-content>
</template>
<script>
import TeacherServices from '@/services/Teacher';
export default {
	data() {
		return {
			valid: true,
			name: '',
			nameRules: [v => !!v || 'Обязательное поле'],
			time: '',
			timeRules: [v => !!v || 'Время для прохождения теста в минутах'],
			questions: [],
			performingRequest: false,
		};
	},
	methods: {
		validate() {
			if (this.$refs.testForm.validate()) {
				event.preventDefault();
				this.performingRequest = true;
				this.createTest();
				this.performingRequest = false;
			} else {
                alert("Ошибка валидации");
				console.log('validate');
			}
		},
		async createTest() {
			try {
				const response = await TeacherServices.createTest({
					name: this.name,
					questions: this.questions,
					groups: this.groups,
					time: this.time,
				});
				if (response.data.message) {
                    this.performingRequest = false;
                    alert("Тест создан");
                    this.$refs.testForm.reset();
                    this.questions = [];
				} else {
					this.performingRequest = false;
                    alert(`Ошибка ${response.data.error}`);
				}
			} catch (error) {
                alert(error);
                
				console.log(error);
			}
		},
		addQuestion() {
			this.questions.push({
				question: '',
				answers: [
					{
						answer: '',
						isAnswer: false,
					},
				],
			});
		},
		deleteQuestion(item) {
			this.questions.splice(item, 1);
		},
		addAnswer(item) {
			this.questions[item].answers.push({
				answer: '',
				isAnswer: false,
			});
		},
		deleteAnswer(item, answer) {
			this.questions[item].answers.splice(answer, 1);
		},
	},
};
</script>