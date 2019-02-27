<template>
    <v-content>
        <v-container>
            <div class="login-content">
                <h1 class="text-xs-center display-1 font-weight-light top-text">Регистрация</h1>
                <div class="login-form">
                    <v-form 
                        ref="registerForm"
                        @submit.prevent
                        v-model="valid"
                        class="mt-3 mb-3">
                        <v-alert
                            v-model="errorAlert"
                            outline
                            class="error-alert mb-3"
                            color="#fd5b4d"
                            dismissible>
                            {{error_message}}
                        </v-alert>
                        <v-text-field
                            solo
                            class="login-input"
                            :rules="usernameRules"
                            v-model="username"
                            required
                            label="Имя пользователя"></v-text-field>
                        <v-select
                            :items="roles"
                            label="Выберите тип"
                            solo
                            item-text="text"
                            item-value="role"
                            v-model="role">
                        </v-select>
                        <v-text-field
                            solo
                            class="login-input"
                            label="Email"
                            v-model="email"
                            :rules="emailRules"
                            required
                            type="email"></v-text-field>
                        <v-text-field
                            solo
                            class="login-input"
                            label="Пароль"
                            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            v-model="password"
                            :rules="passwordRules"
                            required></v-text-field>
                        <v-text-field
                            solo
                            class="login-input"
                            label="Повторите пароль"
                            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            v-model="confirmPassword"
                            :rules="confirmPasswordRules"
                            required></v-text-field>
                        <v-btn
                            @click="validate()"
                            color=""
                            dark
                            type="submit"
                            class="elevation-8 text-none auth-btn ml-3"
                            right
                            :loading="performingRequest">
                            Зарегистрироваться
                        </v-btn>
                    </v-form>
                </div>
            </div>
        </v-container>
    </v-content>
</template>
<script>
import Auth from '@/services/Auth'
export default {
	data() {
		return {
			valid: true,
			showPassword: false,
			username: '',
			roles: [
				{
					text: 'Преподаватель',
					role: 'teacher'
				},
				{
					text: 'Студент',
					role: 'student'
				},
			],
			usernameRules: [
				v => !!v || 'Обязательное поле',
			],
			email: '',
			emailRules: [
				v => !!v || 'Обязательное поле',
				v => /.+@.+/.test(v) || 'Введите корректный Email'
			],
			password: '',
			passwordRules: [
				v => !!v || 'Обязательное поле',
				v => (v && v.length >= 6) || 'Пароль должен быть более 6 символов'
			],
			confirmPassword: '',
			confirmPasswordRules: [
				v => !!v || 'Обязательное поле',
				v => (v == this.password) || 'Пароли не совпадают'
			],
			error_message: '',
			errorAlert: false,
			performingRequest: false,
			role: 'student'
		}
	},
	methods: {
		validate() {
			if (this.$refs.registerForm.validate()) {
				event.preventDefault();
				this.performingRequest = true;
				this.register();
			} else {
				console.log("validate");
			}
		},
		async register() {
			try {
				const response = await Auth.register({
					name: this.username,
					email: this.email,
					role: this.role,
					password: this.password,
				});
				if (response.data.message) {
					this.performingRequest = false;
					this.$router.push('/login');
				} else {
					this.performingRequest = false;
					this.errorAlert = true;
					throw response.data.error;
				}
			} catch (error) {
				this.error_message = error;
			}
		}
	}
}
</script>