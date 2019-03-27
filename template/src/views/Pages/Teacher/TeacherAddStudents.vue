<template>
    <v-content>
        <v-container>
            <!-- <div class="students">
                <div>
                    <v-text-field
                        v-model="searchStudent"
                        class="search-student-input"
                        placeholder="Поиск студента"
                        solo
                        append-icon="search">
                    </v-text-field>
                    <table class="students-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th class="text-xs-center">Выбрать</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student, i) in filterStudents" :key="i">
                                <td>{{i+1}}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.email}}</td>
                                <td class="text-xs-center">
                                    <input 
                                        type="checkbox" 
                                        class="students-checkbox"
                                        v-model="selectedStudents" 
                                        :value="student.id">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <v-btn 
                        class="text-none" 
                        color="primary">
                        Добавить
                    </v-btn>
                </div>
            </div> -->
            <v-card>
                <v-card-title class="headline">
                    <v-btn 
                        class="text-none"
                        color="primary"
                        @click="addStudents()">
                        Добавить
                    </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="searchStudent"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-data-table
                    class="students-table"
                    :rows-per-page-items="rowsPerPageItems"
                    :headers="headers"
                    :items="students"
                    :search="searchStudent">
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
                <v-alert v-slot:no-results :value="true" color="error" icon="warning">
                    Студент не найден
                </v-alert>
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
            searchStudent: '',
            students: [],
            selectedStudents: [],
            headers: [
            { text: 'Имя', sortable: false },
            { text: 'Email', sortable: false },
            { text: 'Выбор', align: "center", sortable: false },
            ],
            rowsPerPageItems: [10, 20, 30]
        }
    },
    created(){
        this.getAllStudents();
    },
    methods:{
        async getAllStudents(){
            try{
                let response = await TeacherServices.getAllStudents();
                this.students = response.data.students;
                console.log(this.students);
            }catch(err){
                console.log(err);
            }
        },
        async addStudents(){
            try{
                let response = await TeacherServices.addStudents({
                    students: this.selectedStudents
                });
                if(response.data.message){
                    alert('Студенты добавленны');
                }else{
                    alert('Ошибка добавления');
                }
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
