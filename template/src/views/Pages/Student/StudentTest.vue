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
                <v-btn dark color="teal" @click="passTest(test)">Пройти тест</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import StudentServices from '@/services/Student'
export default {
    data(){
        return{
            tests: []
        }
    },
    created(){
        this.getStudentTests();
    },
    methods:{
        async getStudentTests(){
            try{
                let response = await StudentServices.getStudentTests();
                if(response.data.tests){
                    this.tests = response.data.tests;
                    console.log(this.tests)
                }else{
                    console.log("Get student test error");
                    this.getStudentTests();
                }
            }catch(err){
                console.log(err);
            }
        },
        passTest(test){
            //TODO: Тест проверяется и проходится на фронте и отправляется только результат
        }
    }
}
</script>
