<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>
<style>
.v-navigation-drawer > .v-list .v-list__tile--active .v-list__tile__title{
    color: #fff;
    text-decoration: underline;
}
#app{
    background-color: #fff;
}

/* Таблицы */
.data-table td, th{
    font-size: 1.2rem !important;
}
.circle-checkbox{
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
.circle-checkbox::after {
    content: '\f111';
    color: #0D47A1;
    display: inline-block;
    text-align: center;
}
.circle-checkbox:checked::after {
    font-weight: 900;
}
.circle-checkbox:active {
    transform: scale(.4);
}
.circle-checkbox:checked::after {
    content: '\f058';
}

.login-content {
	height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('./assets/background.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #003179;
}
.auth-btn-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.auth-btn-container a{
    color: #0D47A1;
}
</style>
