<template>
    <v-container class="content">
        <div class="login-content">
            <h1 class="text-xs-center display-1 font-weight-light top-text">Login</h1>
            <div class="login-form">
                <v-form class="mt-3 mb-3" @submit.prevent>
                    <v-alert
                        v-model="alert"
                        outline
                        class="error-alert mb-3"
                        color="#fd5b4d"
                        dismissible>
                    {{error_message}}
                    </v-alert>
                    <v-text-field
                        solo
                        placeholder="Email"
                        v-model="user.email"></v-text-field>
                    <v-text-field
                    solo
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    placeholder="Password"
                    v-model="user.password"></v-text-field>
                    <v-btn
                        @click="login()"
                        type="submit"
                        dark
                        class="elevation-8 text-none auth-btn ml-3"
                        right
                        :loading="performingRequest">
                        Login
                    </v-btn>
                    
                </v-form>
            </div>
        </div>
    </v-container>
</template>
<script>
import Auth from '@/services/Auth'
export default {
    data(){
        return{
            user:{
                email: '',
                password: ''
            },
            alert: false,
            showPassword: false,
            error_message: '',
            performingRequest: false
        }
    },
    methods:{
        async login(){
            try{
                event.preventDefault();
                this.performingRequest = true;
                const response = await Auth.login({
                    email: this.user.email,
                    password: this.user.password
                });
                if(response.data.token){
                    this.performingRequest = false;
                    this.$store.dispatch('setUserToken', response.data.token);
                    this.$store.dispatch('setUserData', response.data.user);
                    this.$router.push({name: 'home'});
                }else{
                    this.performingRequest = false;
                    this.alert = true;
                    throw response.data.error;
                }
            }catch(error){
                this.error_message = error;
            }
        }
    }
}
</script>