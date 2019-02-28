<template>
    <v-content>
        <v-container>
            <v-expansion-panel>
                <v-expansion-panel-content
                    v-for="(group, index) in groups"
                    :key="index"
                >
                <div slot="header">{{group.name}}</div>
                <v-card>
                    <v-card-text>
                        <ol>
                            <li v-for="(student, index) in group.students" :key="index" class="pa-1">
                                {{student.name}}
                            </li>
                        </ol>
                    </v-card-text>
                    <v-btn color="error" @click="deleteGroup(group)" small>Удалить</v-btn>
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-container>
    </v-content>
</template>
<script>
import TeacherServices from '@/services/Teacher'
export default {
    data(){
        return{
            groups: []
        }
    },
    created(){
        this.getGroups();
    },
    methods:{
        async getGroups(){
            try{
                let response = await TeacherServices.getGroups();
                if(response.data.groups){
                    console.log("succes getGroups");
                    this.groups = response.data.groups;
                }else{
                    console.log("Error getGroups");
                    this.getGroups();
                }
            }catch(err){
                console.log(err);
            }
        },
        async deleteGroup(group){
            try{
                let response = await TeacherServices.deleteGroup({
                    id: group._id
                });
                if(response.data.message){
                    console.log(response.data.message);
                    this.getGroups();
                }else{
                    console.log("Error delete group");
                }
            }catch(err){    
                console.log(err);
            }
        }
    }
}
</script>
