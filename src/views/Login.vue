<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <loginComponent />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import loginComponent from '../components/auth/login';

export default {
    components: {
        loginComponent
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
    }
};
</script>

<style>
</style>