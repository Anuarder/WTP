<template>
    <v-content>
        <v-container>
            Results
        </v-container>
    </v-content>
</template>
<script>
import TeacherServices from '@/services/Teacher'
export default {
    created(){
        this.getStudents();
    },
    methods: {
        async getStudents(){
            try{
                let response = await TeacherServices.getTeacherStudents();
                console.log(response);
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
