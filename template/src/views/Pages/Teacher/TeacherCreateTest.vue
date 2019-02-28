<template>
  <v-content>
    <v-container>
      <div class="login-content">
        <h1 class="text-xs-center display-1 font-weight-light top-text">Добавить тест</h1>
        <div class="login-form">
          <v-form ref="registerForm" @submit.prevent v-model="valid" class="mt-3 mb-3">
            <v-alert
              v-model="errorAlert"
              outline
              class="error-alert mb-3"
              color="#fd5b4d"
              dismissible
            >{{error_message}}</v-alert>
            <v-alert
              v-model="succesAlert"
              outline
              class="error-alert mb-3"
              color="success"
              dismissible
            >{{success_message}}</v-alert>
            <!-- CODE -->
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
            <hr class="mb-3">
            <h2 class="mb-3">Вопросы</h2>
            <div v-for="(question, i) in questions" :key="i">
                <h3 class="mb-2 font-weight-medium">
                    Вопрос {{i+1}} 
                    <v-btn 
                        icon
                        color="error" 
                        small 
                        @click="deleteQuestion(i)"
                    ><v-icon>delete</v-icon></v-btn> 
                </h3> 
                <v-text-field
                    :label="`${i+1} вопрос`"
                    solo
                    v-model="question.question"
                ></v-text-field>
                <div v-for="(answer, j) in question.answers" :key="j">
                    <v-text-field
                        :prepend-icon="answer.isAnswer ? 'check_circle' : 'highlight_off'"
                        :label="`${j+1} ответ`"
                        append-icon="delete"
                        solo
                        @click:prepend="answer.isAnswer = !answer.isAnswer"
                        @click:append="deleteAnswer(i, j)"
                    ></v-text-field>
                </div>
                <v-btn small color="primary" @click="addAnswer(i)">Добавить ответ</v-btn>
            </div>
            <v-btn 
                class="text-none mt-3"
                color="teal"
                dark
                @click="addQuestion"
            ><v-icon left>note_add</v-icon> Добавить вопрос</v-btn>
          </v-form>
        </div>
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
			error_message: '',
			errorAlert: false,
			success_message: '',
			succesAlert: false,
            performingRequest: false,
		};
	},
	methods: {
		validate() {
			if (this.$refs.registerForm.validate()) {
				event.preventDefault();
				this.performingRequest = true;
				// this.createTest();
				this.performingRequest = false;
			} else {
				console.log('validate');
			}
		},
		async createTest() {
			try {
				const response = await TeacherServices.createTest({
					name: this.name,
                    questions: this.questions,
                    groups: this.groups,
                    time: this.time
				});
				if (response.data.message) {
					this.performingRequest = false;
					this.success_message = 'Тест создан';
					this.succesAlert = true;
					setTimeout(() => {
						this.succesAlert = false;
					}, 800);
				} else {
					this.performingRequest = false;
					this.error_message = response.data.error;
					this.errorAlert = true;
					setTimeout(() => {
						this.errorAlert = false;
					}, 1000);
				}
			} catch (error) {
				console.log(error);
			}
        },
        addQuestion(){
            this.questions.push({
                question: '',
                answers:[
                    {
                        answer: '',
                        isAnswer: false
                    }
                ]
            });
        },
        deleteQuestion(item){
            this.questions.splice(item, 1);
        },  
        addAnswer(item){
            this.questions[item].answers.push({
                answer: '',
                isAnswer: false
            });
        },
        deleteAnswer(item, answer){
            this.questions[item].answers.splice(answer, 1);
        }
	},
};
</script>