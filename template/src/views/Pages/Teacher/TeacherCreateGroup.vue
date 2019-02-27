<template>
  <v-content>
    <v-container>
      <div class="login-content">
        <h1 class="text-xs-center display-1 font-weight-light top-text">Создать группу</h1>
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
            <v-text-field
              solo
              class="login-input"
              :rules="nameRules"
              v-model="name"
              required
              label="Название группы"
            ></v-text-field>
            <v-select
              :items="allStudents"
              label="Выберите студентов"
              solo
              :rules="[v => !!v || 'Обязательное поле']"
              item-text="name"
              item-value="id"
              v-model="students"
              required
              multiple
              return-object
            ></v-select>
            <v-btn
              @click="validate()"
              color
              dark
              type="submit"
              class="elevation-8 text-none auth-btn ml-3"
              right
              :loading="performingRequest"
            >Создать группу</v-btn>
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
			allStudents: [],
			nameRules: [v => !!v || 'Обязательное поле'],
			students: [],
			error_message: '',
			errorAlert: false,
			success_message: '',
			succesAlert: false,
			performingRequest: false,
		};
	},
	created() {
		this.getStudents();
	},
	methods: {
		validate() {
			if (this.$refs.registerForm.validate()) {
				event.preventDefault();
				this.performingRequest = true;
				this.createGroup();
				this.performingRequest = false;
			} else {
				console.log('validate');
			}
		},
		async createGroup() {
			try {
				const response = await TeacherServices.createGroup({
					name: this.name,
					students: this.students,
				});
				if (response.data.message) {
					this.performingRequest = false;
					this.success_message = 'Группа созданна';
					this.succesAlert = true;
					setTimeout(() => {
						this.succesAlert = false;
					}, 2000);
				} else {
					this.performingRequest = false;
					this.error_message = response.data.error;
					this.errorAlert = true;
					setTimeout(() => {
						this.errorAlert = false;
					}, 2000);
				}
			} catch (error) {
				console.log(error);
			}
		},
		async getStudents() {
			try {
				const response = await TeacherServices.getStudents();
				if (response.data.students) {
					console.log('Success get students');
					this.allStudents = response.data.students;
				} else {
					console.log('Error get students');
					this.getStudents();
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>