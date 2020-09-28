<template>
    <div>
        <v-container fluid >
            <v-row no-gutters>
                <v-col cols="12">
                    <v-data-table
                        :loading="loading"
                        :headers="headers"
                        :items="projects"
                        :items-per-page="5"
                        :search="search"
                        :disabled="loading"
                    >
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>{{ $t('brands') }}</v-toolbar-title>

                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>

                                <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>

                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-btn color="primary" dark class="mb-2" @click="newProject()">{{ $t('new_project') }}</v-btn>
                            </v-toolbar>
                        </template>

                        <template v-slot:item.action="{ item }">
                            <v-icon small class="mr-2 ml-2" @click="initEditAddItem(item)">edit</v-icon>
                            <v-icon small @click="initDeleteItem(item)">delete</v-icon>
                        </template>

                        <template v-slot:item.date_created="{ item }">
                            {{ item.date_created | moment("DD/MM/YYYY") }}
                        </template>
                        <template v-slot:item.date_updated="{ item }">
                            {{ item.date_updated | moment("DD/MM/YYYY") }}
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <projectAddEditComponent 
            v-on:projectUpdated="getBrands()"
            v-on:projectCreated="projectUpdated"
            :projectId="currentProjectId" 
            :showDialog.sync="showAddEditDialog" 
            />
            <genericConfirmDeleteDialog
            :showDeleteDialog.sync="showDeleteDialog"
            :loading.sync="loading"
            v-on:confirmResult="confirmDelete"
            />
            <v-snackbar :color="snackbarColor" v-model="showSnackbar">
                {{ snackbarMessage }}
                <v-btn text @click="showSnackbar = false">
                    {{ $t('close') }}
                </v-btn>
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
import { getAll, deleteById } from "../../api/brand.api";
import projectAddEditComponent from '../components/brand/addEditComp';
import genericConfirmDeleteDialog from '../components/utility/dialogs/genericConfirmDeleteDialog';

export default {
    components: {
        projectAddEditComponent,
        genericConfirmDeleteDialog
    },
    data() {
        return {
            search: "",
            headers: [
                { text: this.$t("name"), value: "name", sortable: false},
                { text: this.$t("categories"), value: "categories", sortable: false },
                { text: this.$t("date_created"), value: "date_created", sortable: false },
                { text: this.$t("date_updated"), value: "date_updated", sortable: false },
                { text: "Actions", value: "action", sortable: false }
            ],
            projects: [],
            loading: true,
            showAddEditDialog: false,
            showDeleteDialog: false,
            currentProjectId: "0",
            itemToBeDeleted: null,
            snackbarColor: "primary",
            showSnackbar: false,
            snackbarMessage: ""
        };
    },
    methods: {
        async getBrands() {
            try {
                this.loading = true;
                const resp = await getAll();
                if (resp.status === 200 && resp.data.status === 1) {
                    this.projects = resp.data.result.projects;
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        initEditAddItem(item) {
            this.currentProjectId = item._id;
            this.showAddEditDialog = true;
        },
        initDeleteItem(item) {
            this.itemToBeDeleted = item;
            this.showDeleteDialog = true;
        },
        newProject(){
            this.currentProjectId = "0";
            this.showAddEditDialog = true;
        },
        confirmDelete(deleteRecord){
            if(deleteRecord){
                this.loading = true;
                this.deleteProject();
            } else {
                this.showDeleteDialog = false;
            }
        },
        async deleteProject(){
            try {
                const response = await deleteById(this.itemToBeDeleted._id);
                if(response.status === 200 && response.data.status === 1){
                    this.showSuccess(response.data.result.message.message_en);
                }
                this.showDeleteDialog = false;
                this.getBrands();
            } catch (error) {
                this.showDeleteDialog = false;
                this.loading = false;
                console.log(error);
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
        },
        projectUpdated(response){
            this.getBrands();
            this.showSuccess(response.result.message.message_en);
        }
    },
    computed: {},
    watch: {},
    mounted() {
        this.getBrands();
    }
};
</script>

<style>
</style>