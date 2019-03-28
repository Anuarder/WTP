<template>
    <v-card>
        <v-card-title class="headline">
            <v-btn 
                class="text-none"
                color="primary"
                @click="handleClick()">
                {{action}}
            </v-btn>
            <v-btn 
                v-if="deleteTests"
                class="text-none"
                color="error"
                @click="deleteClick()">
                Удалить
            </v-btn>
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
                <td class="text-xs-center">
                    <input 
                        type="checkbox" 
                        class="circle-checkbox"
                        v-model="selectedTests" 
                        :value="props.item.id">
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
export default {
    props: {
        tests: Array,
        action: String,
        deleteTests: Boolean
    },
    data(){
        return{
            searchTest: '',
            headers: [
                { text: 'Имя', sortable: false },
                { text: 'Время, мин.', sortable: false },
                { text: 'Кол-во вопросов', sortable: false},
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
    methods: {
        handleClick(){
            if(this.selectedTests.length !== 0){
                this.$emit('handleClick', this.selectedTests);
            }else{
                alert("Выберите тесты");
            }
        },
        deleteClick(){
            if(this.selectedTests.length !== 0){
                this.$emit('deleteClick', this.selectedTests);
            }else{
                alert("Выберите тесты");
            }
        }
    }
}
</script>