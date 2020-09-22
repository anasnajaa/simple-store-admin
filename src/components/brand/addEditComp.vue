<template>
    <v-dialog
        v-model="showDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
    >
        <v-card flat tile>
            <v-card-title class="pa-0">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card-title>

            <v-card-text class="pa-0">
                <v-container >
                    <v-row v-if="!loading || itemFetchedCorrectly">
                        <v-col cols="12">
                            <v-text-field :disabled="loading" v-model="item.name" :label="$t('name')"></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field :disabled="loading" v-model="item.totalCost" type="number" :label="$t('cost')"></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field :disabled="loading" v-model="item.client" :label="$t('client')"></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field :disabled="loading" v-model="item.areaTotalSize" type="number" :label="$t('total_project_area_size')"></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field :disabled="loading" type="date" v-model="startDateComputed" :label="$t('starting_date')"></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field :disabled="loading" type="date" v-model="endDateComputed" :label="$t('ending_date')"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row  v-else-if="loading">
                        <v-col cols="12 text-center" >
                            <v-progress-circular
                                :size="70"
                                :width="7"
                                color="purple"
                                indeterminate
                            ></v-progress-circular>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col col="12" class="text-center">
                            <h3>{{ error }}</h3>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions v-if="itemFetchedCorrectly">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" :loading="loading" text @click="save">{{ $t('save') }}</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar :color="snackbarColor" v-model="showSnackbar">
            {{ snackbarMessage }}
            <v-btn text @click="showSnackbar = false">
                {{ $t('close') }}
            </v-btn>
        </v-snackbar>
    </v-dialog>
</template>

<script>
import { getById, update, add } from "../../../api/brand.api";


export default {
    name: "projectAddEditComponent",
    components: {
    },
    props: {
        showDialog: {
            type: Boolean,
            required: true
        },
        projectId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            itemFetchedCorrectly: false,
            item: {},
            defaultItem: {
                name: null,
                totalCost: null,
                client: null,
                areaTotalSize: null,
                startDate: new this.$moment(),
                endDate: new this.$moment(),
                createdAt: new this.$moment(),
                updatedAt: new this.$moment(),
            },
            error: null,
            snackbarColor: "primary",
            showSnackbar: false,
            snackbarMessage: ""
        };
    },
    computed: {
        formTitle() {
            return this.newProject ? this.$t('new_project') : this.$t('edit_project');
        },
        startDateComputed: {
            get: function(){
                return this.$moment(this.item.startDate).format('YYYY-MM-DD');
            },
            set: function(newDate){
                this.item.startDate = new this.$moment(newDate);
            }
        },
        endDateComputed: {
            get: function(){
                return this.$moment(this.item.endDate).format('YYYY-MM-DD');
            },
            set: function(newDate){
                this.item.endDate = new this.$moment(newDate);
            }
        },
        newProject(){
            return this.projectId === "0";
        }
    },
    methods: {
        close() {
            this.$emit('update:showDialog', false);
        },
        async save() {
            if(this.newProject){
                this.createProject();
            } else {
                this.updateProject();
            }

            // if (this.editedIndex > -1) {
            //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
            // } else {
            //     this.projects.push(this.editedItem);
            // }
        },
        async getProject(){
            try {
                this.loading = true;
                this.itemFetchedCorrectly = false;
                const response = await getById(this.projectId);
                if(response.status === 200 && response.data.status === 1){
                    this.item = response.data.result.projects[0];
                    this.itemFetchedCorrectly = true;
                } else {
                    this.error = this.$t('failed_to_load_data');
                }
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.itemFetchedCorrectly = false;
                this.loading = false;
            }
        },
        async updateProject(){
            try {
                this.loading = true;
                const response = await update(this.item);
                if(response.status === 200 && response.data.status === 1){
                    this.showSuccess(response.data.result.message.message_en);
                    this.$emit('projectUpdated', response.data.result.projects[0]);
                } else {
                    this.showError(response.data.error.message_en);
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.showError(error);
            }
        },
        async createProject(){
            try {
                this.loading = true;
                const response = await add(this.item);
                if(response.status === 200 && response.data.status === 1){
                    this.close();
                    this.item = {... this.defaultItem};
                    this.$emit('projectCreated', response.data);
                }else {
                    this.showError(response.data.error.message_en);
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.showError(error);
            }
            
        },
        showError(message){
            this.snackbarColor = "error";
            this.snackbarMessage = message;
            this.showSnackbar = true;
        },
        showSuccess(message){
            this.snackbarColor = "success";
            this.snackbarMessage = message;
            this.showSnackbar = true;
        }
    },
    mounted() {
        this.itemFetchedCorrectly = true;
        this.loading = false;
        this.item = {... this.defaultItem};
    },
  watch: {
    projectId: function (newId) {
        console.log(this.item);
        if(newId === "0"){
            this.itemFetchedCorrectly = true;
            this.loading = false;
            this.item = {... this.defaultItem};
        } else {
            this.getProject();
        }
    }
  },
};
</script>

<style>
</style>