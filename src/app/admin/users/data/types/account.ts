export interface Account {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    phonenumber: string,
    email: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: string,
    deleteFlag: string,
    roles: [
        {
            id: number,
            name: string
        }
    ],
    acctActive: boolean,
    acctLocked: boolean,
    loggedIn: boolean
}
