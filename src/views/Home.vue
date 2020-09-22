<template>
    <div class="home">
        <div>
            <h2>Hello</h2>     
        </div>
        <div>{{ this.profile }}</div>
    </div>
</template>

<script>
import { getProfile } from "../../api/account.api";

export default {
    name: "home",
    components: {},
    computed: {
        signedIn() {
            return this.$store.getters["auth/getSignedIn"];
        }
    },
    data() {
        return {
            profile: "",
            loading: false,
            colors: [
                "primary",
                "secondary",
                "yellow darken-2",
                "red",
                "orange"
            ],
            suraAyat: [],
            suraId: 1
        };
    },
    methods: {
    },
    async mounted() {
        if (this.signedIn) {
            try {
                let res = await getProfile();
                if (res.status === 200 && res.data.status === 1) {
                    this.profile = res.data.result;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
