<template>
  <v-content>
    <v-container>
      <h2>Настройки</h2>
      <v-card>
        <v-card-title>
          <div>
            <h3>Обновить пароль</h3>
            <div class="mt-3">
              <v-form @submit.prevent ref="updatePassword" v-model="valid">
                <v-alert
                  v-model="errorAlert"
                  outline
                  class="error-alert mb-3"
                  color="#fd5b4d"
                  dismissible
                >{{error_message}}</v-alert>
                <v-alert
                  v-model="successAlert"
                  outline
                  class="error-alert mb-3"
                  color="success"
                  dismissible
                >{{success_message}}</v-alert>
                <v-text-field
                  solo
                  class="login-input"
                  label="Новый пароль"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  v-model="newPassword"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-text-field
                  solo
                  class="login-input"
                  label="Подтвердите пароль"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  required
                ></v-text-field>
                <div class="login-btn">
                  <v-btn
                    @click="validate()"
                    type="submit"
                    color="primary"
                    :loading="performingRequest"
                  >Обновить</v-btn>
                </div>
              </v-form>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-container>
  </v-content>
</template>
<script>
import {mapState} from 'vuex';
import Auth from '@/services/Auth.js';
export default {
	data() {
		return {
			valid: true,
			errorAlert: false,
			successAlert: false,
			performingRequest: false,
			showPassword: false,
			newPassword: '',
			passwordRules: [
				v => !!v || 'Обязательное поле',
				v => (v && v.length >= 6) || 'Пароль должен быть более 6 символов',
			],
			confirmPassword: '',
			confirmPasswordRules: [
				v => !!v || 'Обязательное поле',
				v => v == this.newPassword || 'Пароли не совпадают',
			],
			error_message: '',
			success_message: '',
		};
	},
	computed: {
		...mapState(['user']),
	},
	methods: {
		validate() {
			if (this.$refs.updatePassword.validate()) {
				event.preventDefault();
				this.performingRequest = true;
				this.updatePassword();
			} else {
				console.log('validate');
			}
		},
		async updatePassword() {
			try {
				let response = await Auth.updatePassword({
					newPassword: this.newPassword,
				});
				if (response.data.message) {
					this.performingRequest = false;
					this.success_message = 'Пароль обновлен';
					this.successAlert = true;
				} else {
					this.performingRequest = false;
					this.error_message = 'Ошибка';
					this.errorAlert = true;
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>