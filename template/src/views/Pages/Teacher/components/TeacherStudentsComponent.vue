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
            class="students-table"
            :rows-per-page-items="rowsPerPageItems"
            :headers="headers"
            :items="filterStudents">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td class="text-xs-center">
                    <input 
                        type="checkbox" 
                        class="students-checkbox"
                        v-model="selectedStudents" 
                        :value="props.item.id">
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
import TeacherServices from '@/services/Teacher'
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
            this.$emit('handleClick', this.selectedStudents);
        },
        deleteClick(){
            this.$emit('deleteClick', this.selectedStudents);
        }
    }
}
</script>
<style scoped>
.students-table td, th{
    font-size: 1.2rem;
}
.students-checkbox{
    cursor: pointer;
    position: relative;
    appearance: none;
    font-size: 1.5rem;
    margin: 0;
    color: inherit;
    outline: none;
    font-family: 'Font Awesome 5 Free';
    transition: 300ms ease-out;
}
.students-checkbox::after {
    content: '\f111';
    color: #0D47A1;
    display: inline-block;
    text-align: center;
}
.students-checkbox:checked::after {
    font-weight: 900;
}
.students-checkbox:active {
    transform: scale(.4);
}
.students-checkbox:checked::after {
    content: '\f058';
}
</style>
