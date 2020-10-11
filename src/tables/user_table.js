
export const defaultMenu = ['/rbac/home','/rbac/user']

export let userTable = [
    {
        id: 128832,
        username: 'vinfer',
        email: 'vinferj@vmail.com',
        password: '123456',
        menuList: [
            '/rbac/home',
            '/rbac/user',
            '/rbac/admin'
        ]
    },
    {
        id: 122345,
        username: '张大炮',
        email: 'zdp@zmail.com',
        password: '123456',
        menuList: [
            '/rbac/home',
            '/rbac/user',
        ]
    }
]

/*
export function getUserTable(){
    return userTable
}

export function addNewUser(user){
    if ()
    let defaultUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        menuList: defaultMenu
    }
    userTable.push(defaultUser)
}*/
