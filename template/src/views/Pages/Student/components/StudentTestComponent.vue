<template>
    <v-card>
        <v-card-title class="headline blue-grey darken-1" primary-title>
            <span class="white--text">{{test.name}}</span>
            <v-spacer></v-spacer>
            <v-btn flat dark>Время {{currentTime.min}}:{{currentTime.sec}}</v-btn>
        </v-card-title>
        <v-card-text>
            <v-carousel touch light hide-delimiters>
                <v-carousel-item v-for="(question, i) in answers" :key="i">
                <div class="ma-4">
                    <h2>{{question.question}}</h2>
                    <v-list>
						<v-list-tile avatar v-for="(answer, j) in question.answers" :key="j">
							<v-list-tile-title
								@click="answer.isSelected = !answer.isSelected"
								class="answer"
								:class="answer.isSelected ? 'answer-active' : ''">
								{{j+1}}) {{answer.answer}}
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
			<v-btn color="teal" dark @click="sendTestToVerification()">Сдать</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import StudentServices from '@/services/Student'
export default {
	props: {
		test: Object
	},
	data(){
		return {
			currentTime: {},
			answers: {}
		}
	},
	created(){
		this.setTest();
	},
    methods: {
        setTest() {
			let data = [];
			for (let question of this.test.questions) {
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
				min: this.test.time,
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
			this.answers = [];
			this.currentTime = 0;
			this.$emit("close");
		},
		timeOver() {
			alert('Время потраченно');
			this.sendTestToVerification(true);
		},
		sendTestToVerification(isTimeOver){
			if(isTimeOver){
				this.sendTest();
			}else{
				let sendConfirm = confirm("Отправить тест на проверку?");
				if(sendConfirm){
					this.sendTest();
				}
			}
		},
		async sendTest(){
			try{
				let response = await StudentServices.sendTestToVerification({
					test: this.test._id,
					passedTest: this.answers,
				});
				if(response.data.message){
					alert("Тест отправлен на проверку");
					this.cancelTestPass();
					this.$emit('updateTest');
				}else{
					alert("Ошибка при отправке теста");
				}
			}catch(err){
				console.log(err);
			}
		}
    }
}
</script>
<style scoped>
.answer{
	cursor: pointer
}
.answer-active{
	color: #0f45f8;
}
</style>
