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
                            <li v-for="(student, index) in group.students" :key="index">
                                {{student.name}}
                            </li>
                        </ol>
                    </v-card-text>
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
                    console.log(this.groups);
                }else{
                    console.log("Error getGroups");
                    this.getGroups();
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
