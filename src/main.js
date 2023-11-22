import App from './App.vue'
import { createApp } from 'vue'
import initialize from '@/plugins/initialize'

const app = createApp(App)

app.use(initialize)
app.mount('#app')
