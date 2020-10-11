import Register from './src/main'

Register.install = function (Vue){
    Vue.component(Register.name,Register)
}

export default Register