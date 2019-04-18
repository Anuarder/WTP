<template>
	<v-content>
		<v-container>
			<div v-if="!loading">
				<v-layout row wrap v-if="activeTests.length !== 0">
					<v-flex xs12 md4 v-for="(test, i) in activeTests" :key="i">
						<v-card class="mt-3 mr-3">
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-3">
										{{test.name}}
									</h3>
									<div>
										Время: {{test.time}} минут
									</div>
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn 
									dark 
									color="red" 
									@click="openTestDialog(test)">
									Пройти тест
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-dialog v-model="dialog" max-width="1000">
						<student-test-component
							v-if="dialog"
							:test="currentTest"
							@close="closeTestDialog"
							@updateTest="getActiveTests">
						</student-test-component>
					</v-dialog>
				</v-layout>
				<div v-else>
					<h1 class="display-1">
						У вас отсутсвуют активные тесты
					</h1>
				</div>
			</div>
			<div v-else class="loading">
				<h1 class="display-1">
					Загрузка...
				</h1>
			</div>
		</v-container>
	</v-content>
</template>
<script>
import StudentServices from '@/services/Student';
export default {
	components: {
		StudentTestComponent: () => import('./components/StudentTestComponent')
	},
	data() {
		return {
			dialog: false,
			activeTests: [],
			currentTest: {},
			loading: true
		};
	},
	created() {
		this.getActiveTests();
	},
	methods: {
		async getActiveTests() {
			this.loading = true;
			try {
				let response = await StudentServices.getActiveTests();
				if (response.data.tests) {
					this.activeTests = response.data.tests;
					this.activeTests.reverse();
					this.loading = false;
				} else {
					console.log('Get student test error');
				}
			} catch (err) {
				console.log(err);
			}
		},
		openTestDialog(test){
			this.dialog = true;
			this.currentTest = test;
		},
		closeTestDialog(){
			this.dialog = false;
		}
	}
};
</script>
<style scoped>
.loading{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style>
