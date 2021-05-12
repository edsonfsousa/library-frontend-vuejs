import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import pt from 'vuetify/es5/locale/pt';

Vue.component('my-component', {
    methods: {
        changeLocale() {
            this.$vuetify.lang.current = 'pt';
        }
    }
});

export default new Vuetify({
    theme: { dark: false },
    lang: {
        locales: { pt },
        current: 'pt'
    }
});
