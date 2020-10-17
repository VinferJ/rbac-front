
export const defaultMenu = [
    {
        path: '/rbac/user',
        children: []
    },
]

export let userTable = [
    {
        id: 128832,
        username: 'vinfer',
        email: 'vinferj@vmail.com',
        password: '123456',
        menuList: [
            {
                path: '/rbac/user',
                children: [
                    {
                        path: '/p1',
                        children:[
                            {
                                path: '/p6',
                                children:[]
                            }
                        ]
                    }
                ]
            },
            {
                path: '/rbac/admin',
                children: []
            },
        ]
    },
    {
        id: 122345,
        username: '张大炮',
        email: 'zdp@zmail.com',
        password: '123456',
        menuList: [
            {
                path: '/rbac/user',
                children: []
            },
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
