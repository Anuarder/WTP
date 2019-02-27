<template>
    <div>
        <v-toolbar color="light-blue darken-3" dark app clipped-left>
            <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
            <v-toolbar-title>DL</v-toolbar-title>
                <v-spacer></v-spacer>
            <v-btn icon to="/settings">
                <v-icon>settings</v-icon>
            </v-btn>
            <v-btn icon @click="logout()">
                <v-icon>input</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer 
            v-model="sidebar"
            app
            :mini-variant="mini"
            clipped
            fixed
            dark
            class="light-blue darken-4">
            <v-list>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../assets/avatar.png">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>@{{user.name}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon @click.native.stop="mini = !mini">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-tile :to="{name: item.path}" avatar v-for="item in menu" :key="item.path">
                    <v-list-tile-avatar>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar v-if="mini">
                    <v-list-tile-avatar>
                        <v-btn icon @click="mini = !mini"><v-icon>chevron_right</v-icon></v-btn>
                    </v-list-tile-avatar>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            mini: true,
            sidebar: true,
            menu: ''
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created(){
        this.checkRole();
    },
    methods: {
        checkRole(){
            if(this.user.role == 'student'){
                this.menu = [
                    { icon: 'assessment', name: 'Статистика', path: 'studentStatistics' },
                    { icon: 'question_answer', name: 'Тестирование', path: 'studentTest' },
                ]
            }else if(this.user.role == 'teacher'){
                this.menu = [
                    { icon: 'assessment', name: 'Статистика', path: 'teacherStatistics' },
                    { icon: 'question_answer', name: 'Провести тестирование', path: 'teacherTest' },
                ]
            }
        },
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
}
</script>