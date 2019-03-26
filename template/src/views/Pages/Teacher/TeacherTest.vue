<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-card class="mt-3" v-for="(test, i) in tests" :key="i">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{test.name}}</h3>
                <div>Время {{test.time}} минут</div>
                <div>Сдали: {{test.results.pass}} Не сдали: {{test.results.flooded}}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-dialog v-model="dialog" persistent max-width="300">
                <v-card>
                  <v-card-title class="headline">Выберите группы</v-card-title>
                  <v-card-text>
                    <v-select
                      :items="allGroups"
                      label="Выберите группы"
                      color="teal"
                      item-text="name"
                      item-value="id"
                      v-model="groups"
                      required
                      multiple
                      return-object
                    ></v-select>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="teal" @click="sendTest(test)">Провести тест</v-btn>
                    <v-btn color="error" @click="dialog = !dialog">Отмена</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn dark color="teal" small @click="dialog = !dialog">Провести тест</v-btn>
              <v-btn color="error" small @click="deleteTest(test)">Удалить тест</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import TeacherServices from '@/services/Teacher';
export default {
	data() {
		return {
			dialog: false,
			tests: [],
			allGroups: [],
			groups: [],
		};
	},
	created() {
		this.getTests();
		this.getGroups();
	},
	methods: {
		async getTests() {
			try {
				let response = await TeacherServices.getTests();
				if (response.data.tests) {
					this.tests = response.data.tests;
				} else {
					console.log('getTests error');
					this.getTests();
				}
			} catch (err) {
				console.log(err);
			}
		},
		async deleteTest(test) {
			try {
				let response = await TeacherServices.deleteTest({
					id: test._id,
				});
				if(response.data.message){
					this.getTests();
				}else{
					alert("Ошибка");
				}
			} catch (err) {
				console.log(err);
			}
		},
		async sendTest(test) {
			try {
				let response = await TeacherServices.sendTest({
					id: test._id,
					groups: this.groups,
				});
				if (response.data.success) {
					console.log(response.data.message);
					this.currentTest = '';
				} else {
					//TODO: Отправляется не с первого раза
					console.log(response.data.message);
				}
				this.dialog = false;
			} catch (err) {
				console.log(err);
			}
		},
		async getGroups() {
			try {
				let response = await TeacherServices.getGroups();
				if (response.data.groups) {
					this.allGroups = response.data.groups;
				} else {
					this.getGroups();
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>
