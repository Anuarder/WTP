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
                v-if="deleteStudents"
                class="text-none"
                color="error"
                @click="deleteClick()">
                Удалить
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="searchStudent"
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
            :items="filterStudents">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td class="text-xs-center">
                    <input 
                        type="checkbox" 
                        class="circle-checkbox"
                        v-model="selectedStudents" 
                        :value="props.item.id">
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
export default {
    props: {
        students: Array,
        action: String,
        deleteStudents: Boolean
    },
    data(){
        return{
            searchStudent: '',
            headers: [
                { text: 'Имя', sortable: false },
                { text: 'Email', sortable: false },
                { text: 'Выбор', align: "center", sortable: false },
            ],
            selectedStudents: [],
            rowsPerPageItems: [10, 20, 30]
        }
    },
    computed:{
        filterStudents(){
            if(this.searchStudent === ''){
                return this.students;
            }else{
                return this.students.filter(item => {
                    if(item.name.toLowerCase().indexOf(this.searchStudent.toLowerCase()) !== -1){
                        return item;
                    }
                });
            }
        }
    },
    methods: {
        handleClick(){
            if(this.selectedStudents.length !== 0){
                this.$emit('handleClick', this.selectedStudents);
            }else{
                alert("Выберите студентов");
            }
        },
        deleteClick(){
            if(this.selectedStudents.length !== 0){
                this.$emit('deleteClick', this.selectedStudents);
            }else{
                alert("Выберите студентов");
            }
        }
    }
}
</script>