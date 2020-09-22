<template>
  <div>
    {{fullName}}
  </div>
</template>

<script>
export default {
    data(){
      return {

      };
    },
    computed: {
        signedIn(){
            return this.$store.getters["auth/getSignedIn"];
        },
        roles(){
            return this.$store.getters["auth/getUserRoles"];
        },
        email(){
            return this.$store.getters["auth/getUserEmail"];
        },
        fullName(){
            let fName = this.$store.getters["auth/getFnameEn"];
            let lName = this.$store.getters["auth/getLnameEn"];
            return `${fName} ${lName}`
        }
    },
    methods: {

    }
}
</script>

<style>

</style>