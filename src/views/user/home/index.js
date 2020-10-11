
import Home from './src/main'

Home.install = function (Vue){
    Vue.component(Home.name, Home)
}

export default Home