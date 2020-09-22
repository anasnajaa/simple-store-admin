<template>
    <v-dialog width="auto " v-model="showDeleteDialog" persistent >
        <v-card>
            <v-card-title class="headline">{{ $t('confirm_delete_title') }}</v-card-title>
            <v-card-text>{{ $t('confirm_delete_message_body_1') }}<br/> {{ $t('confirm_delete_message_body_2') }}</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="green darken-1" :disabled="loading" text @click="$emit('confirmResult', false)">{{ $t('no') }}</v-btn>
                <v-btn color="green darken-1" :loading="loading" text @click="$emit('confirmResult', true)">{{ $t('yes') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "genericConfirmDeleteDialog",
    props: {
        showDeleteDialog: {
            type: Boolean,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style>

</style>