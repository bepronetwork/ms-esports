
let populate_admin = [
    {
        path : 'security',
        model : 'Security',
        select : { '__v': 0},
    },
    {
        path : 'permission',
        model : 'Permission',
        select : { '__v': 0},
    }
] 

export default populate_admin;