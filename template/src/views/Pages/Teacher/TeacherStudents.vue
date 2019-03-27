<template>
    <v-content>
        <v-container>
            <v-card>
                <v-card-title class="headline">
                    Ваши студенты
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
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </v-content>
</template>
<script>
import TeacherServices from '@/services/Teacher'
export default {
    data(){
        return{
            students: [],
            searchStudent: '',
            headers: [
                { text: 'Имя', sortable: false },
                { text: 'Email', sortable: false },
            ],
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
    created(){
        this.getTeacherStudents();
    },
    methods: {
        async getTeacherStudents(){
            try{
                let response = await TeacherServices.getTeacherStudents();
                this.students = response.data.students.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
<style scoped>
.students-table td, th{
    font-size: 1.2rem;
}
</style>
