import App from './App.vue'
import { createApp } from 'vue'
import initialize from '@/plugins/initialize'
import directives from '@/plugins/directives'

const app = createApp(App)

app.use(initialize)
app.use(directives)
app.mount('#app')
