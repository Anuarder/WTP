<template>
    <v-content>
        <v-container>
            <h1 class="text-xs-center display-1 font-weight-light top-text">Создать дисциплину</h1>
            <div class="course-form">
                <v-form 
                    ref="courseForm"
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
                    <v-alert
                        v-model="successAlert"
                        outline
                        class="error-alert mb-3"
                        color="success"
                        dismissible>
                        {{success_message}}
                    </v-alert>
                    <v-text-field
                        label="Название"
                        v-model="courseName"
                        :rules="courseNameRules"
                        required
                        solo>
                    </v-text-field>
                    <v-text-field
                        label="Кафедра"
                        v-model="department"
                        :rules="departmentRules"
                        solo>
                    </v-text-field>
                    <v-autocomplete
                        v-model="teacher"
                        :items="teachers"
                        :search-input.sync="search"
                        solo
                        item-text="name"
                        item-value="id"
                        label="Препод"
                        return-object>
                    </v-autocomplete>
                    <v-btn
                        @click="validate()"
                        color=""
                        dark
                        type="submit"
                        class="elevation-8 text-none auth-btn ml-3"
                        right
                        :loading="performingRequest">
                        Создать
                    </v-btn>
                </v-form>
            </div>
        </v-container>
    </v-content>
</template>
<script>
import AdminServices from '@/services/Admin.js'
import debounce from 'lodash.debounce'

export default {
    data(){
        return{
            valid: true,
            performingRequest: false,
            courseName: '',
            courseNameRules: [
				v => !!v || 'Обязательное поле',
            ],
            department: '',
            departmentRules: [
				v => !!v || 'Обязательное поле',
            ],
            error_message: '',
			errorAlert: false,
			success_message: '',
            successAlert: false,
            teachers: [],
            search: null,
            teacher: null
        }
    },
    watch: {
		search(val) {
            if(val == ''){
                return
            }else{
                this.debouncedGetAnswer();
            }
		}
    },
    created(){
        this.debouncedGetAnswer = debounce(this.getTeachers, 700);
    },
    methods:{
        validate() {
			if (this.$refs.courseForm.validate()) {
				event.preventDefault();
				this.performingRequest = true;
				this.createCourse();
			} else {
				console.log("validate");
			}
        },
        async createCourse(){
            console.log({
                name: this.courseName,
                department: this.department,
                teacher: this.teacher
            })
            this.performingRequest = false;
        },
        async getTeachers(){
            try{
                let response = await AdminServices.getTeachers({
                    searchText: this.search
                });
                if(response){
                    this.teachers = response.data.teachers;
                }else{
                    throw "Какая то ошибка :("
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
