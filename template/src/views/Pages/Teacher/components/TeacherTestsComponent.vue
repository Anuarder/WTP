<template>
    <v-card>
        <v-card-title>
            <v-btn 
                class="text-none"
                color="primary"
                @click="handleClick()">
                Отправить тесты
            </v-btn>
            <v-btn 
                v-if="!modal"
                class="text-none"
                color="error"
                @click="deleteTest()">
                Удалить
            </v-btn>
            <h1 class="ml-3 headline" v-if="modal">Тесты</h1>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="searchTest"
                append-icon="search"
                label="Поиск"
                single-line
                hide-details>
            </v-text-field>
        </v-card-title>
        <v-data-table
            class="data-table"
            :rows-per-page-items="rowsPerPageItems"
            :headers="headers"
            :items="filterTests">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.questions.length }}</td>
                <td>{{ props.item.date }}</td>
                <td class="text-xs-center">
                    <input 
                        type="checkbox" 
                        class="circle-checkbox"
                        v-model="selectedTests" 
                        :value="props.item._id">
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
import TeacherServices from '@/services/Teacher'
export default {
    props: {
        modal: Boolean,
    },
    data(){
        return{
            searchTest: '',
            tests: [],
            headers: [
                { text: 'Имя', sortable: false },
                { text: 'Время, мин.', sortable: false },
                { text: 'Кол-во вопросов', sortable: false},
                { text: 'Дата создания', sortable: false},
                { text: 'Выбор', align: "center", sortable: false },
            ],
            selectedTests: [],
            rowsPerPageItems: [10, 20, 30]
        }
    },
    computed:{
        filterTests(){
            if(this.searchTest === ''){
                return this.tests;
            }else{
                return this.tests.filter(item => {
                    if(item.name.toLowerCase().indexOf(this.searchTest.toLowerCase()) !== -1){
                        return item;
                    }
                });
            }
        }
    },
    created(){
        this.getTeacherTests();
    },
    methods: {
        handleClick(){
            if(this.selectedTests.length !== 0){
                this.$emit('handleClick', this.selectedTests);
            }else{
                alert("Выберите тесты");
            }
        },
        async getTeacherTests(){
            try{
                let response = await TeacherServices.getTeacherTests();
                this.tests = response.data.tests;
            }catch(err){
                console.log(err);
            }
        },
        async deleteTest(){
            try{
                if(this.selectedTests.length !== 0){
                    let deleteConfirm = confirm("Удалить тесты?");
                    if(deleteConfirm){
                        let response = await TeacherServices.deleteTests({
                            tests: this.selectedTests
                        });
                        if(response.data.message){
                            alert("Тесты удалены");
                            this.getTeacherTests();
                        }else{
                            alert("Ошибка при удалении тестов");
                        }
                    }else{
                        alert("Отмена");
                    }
                }else{
                    alert('Выберите тесты')
                }
                
            }catch(err){
                console.log(err);
            }
        },
    }
}
</script>