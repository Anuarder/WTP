<template>
    <div class="login-content">
        <div>
            <h1 class="text-xs-center display-1 font-weight-light top-text">Авторизация</h1>
            <div class="login-form mt-5">
                <v-form class="mt-3 mb-3" @submit.prevent>
                    <v-alert
                        v-model="alert"
                        outline
                        class="error-alert mb-3"
                        color="#fd5b4d"
                        dismissible
                    >{{error_message}}</v-alert>
                    <v-text-field solo placeholder="Email" v-model="user.email"></v-text-field>
                    <v-text-field
                        solo
                        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        placeholder="Пароль"
                        v-model="user.password"
                    ></v-text-field>
                    <div class="auth-btn-container">
                        <v-btn
                            @click="login()"
                            type="submit"
                            dark
                            class="elevation-8 text-none auth-btn ma-0"
                            color="primary"
                            :loading="performingRequest">
                            Войти
                        </v-btn>
                        <router-link to='/register' class="mt-3 subheading">
                            Регистрация
                        </router-link>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>
<script>
import Auth from '@/services/Auth';
export default {
	data() {
		return {
			user: {
				email: '',
				password: '',
			},
			alert: false,
			showPassword: false,
			error_message: '',
			performingRequest: false,
		};
	},
	methods: {
		async login() {
			try {
				event.preventDefault();
				this.performingRequest = true;
				const response = await Auth.login({
					email: this.user.email,
					password: this.user.password,
				});
				if (response.data.token) {
					this.performingRequest = false;
					this.$store.dispatch('setUserToken', response.data.token);
					this.$store.dispatch('setUserData', response.data.user);
					this.$router.push({name: 'home'});
				} else {
					this.performingRequest = false;
					this.alert = true;
					throw response.data.error;
				}
			} catch (error) {
				this.error_message = error;
			}
		},
	},
};
</script>
