<template>
    <div class="inicio">
        <v-carousel height="650" hide-delimiter-background show-arrows-on-hover cycle>
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            items: [
                {
                    src:
                        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80'
                },
                {
                    src:
                        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80'
                },
                {
                    src:
                        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80'
                },
                {
                    src:
                        'https://images.unsplash.com/photo-1549122728-f519709caa9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80'
                }
            ]
        };
    }
};
</script>
<style scoped>
.inicio {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
#wda {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
