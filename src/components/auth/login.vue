<template>
    <div>
        <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t("login") }}</v-toolbar-title>
                <v-spacer />
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <v-text-field
                        :label="$t('email')"
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="username"
                        :disabled="loading"
                        :rules="[rules.required, rules.email]"
                    />

                    <v-text-field
                        :label="$t('password')"
                        name="password"
                        prepend-icon="lock"
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPass ? 'text' : 'password'"
                        @click:append="showPass = !showPass"
                        :clearable="true"
                        v-model="password"
                        :disabled="loading"
                        :rules="[rules.required]"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    :loading="loading"
                    :disabled="!formValid"
                    @click="login"
                    color="primary"
                >{{$t('login')}}</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { login } from "../../../api/account.api";
import {required, email} from "../../../util/validation";

export default {
    name: 'loginComponent',
    data() {
        return {
            showPass: false,
            username: null,
            password: null,
            loading: false,
            rules: { required, email }
        };
    },
    methods: {
        async login() {
            this.loading = true;

            try {
                const resp = await login(this.username, this.password);
                if (resp.status === 200 && resp.data.status === 1) {
                    let {
                        roles,
                        firstName,
                        lastName,
                        email
                    } = resp.data.user;
                    roles = JSON.stringify(roles);

                    localStorage.signedIn = true;
                    localStorage.roles = roles;
                    localStorage.firstName = firstName;
                    localStorage.lastName = lastName;
                    localStorage.email = email;

                    this.$store.dispatch("auth/setAuthDetails");

                    this.$router.push({ name: "home", params: {} });
                }
            } catch (error) {
                console.log(error);
            }

            this.loading = false;
        }
    },
    computed: {
        formValid() {
            const usernameValid = this.username !== "" && this.username !== null;
            const passValid = this.password !== "" && this.passValid !== null;
            return usernameValid && passValid;
        }
    }
};
</script>

<style>
</style>