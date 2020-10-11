import Login from './src/main'

Login.install = function(Vue){
    Vue.component(Login.name, Login)
}

export default Login