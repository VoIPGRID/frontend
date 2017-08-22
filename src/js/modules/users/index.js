const Module = require('../../lib/module')
/**
* @module user
*/

/**
* The user app handles profile-related functionality.
*/
class UsersModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        // Get the default store and augment.
        let defaultStore = this.getObservables()
        // Augment from the existing store.
        Object.assign(defaultStore, this.app.store.users)
        this.app.store.users = defaultStore

        this.actions = require('./actions')(app, this)

        const AddEditUser = Vue.component('AddEditUser', require('./components/add-edit_user')(app, this.actions))
        const DeleteUser = Vue.component('DeleteUser', require('./components/delete_user')(app, this.actions))
        const ListUsers = Vue.component('ListUsers', require('./components/list_users')(app, this.actions))
        const Login = Vue.component('Login', require('./components/login')(app, this.actions))

        app.router.addRoutes([{
            alias: '/logout',
            component: Login,
            name: 'user_login',
            path: '/login',
        }])

        app.router.addRoutes([{
            component: AddEditUser,
            name: 'add_client_user',
            path: '/clients/:client_id/users/add',
        }])
        app.router.addRoutes([{
            component: AddEditUser,
            name: 'add_partner_user',
            path: '/partners/:partner_id/users/add',
        }])


        app.router.addRoutes([{
            component: AddEditUser,
            name: 'edit_client_user',
            path: '/clients/:client_id/users/:user_id/edit',
        }])
        app.router.addRoutes([{
            component: AddEditUser,
            name: 'edit_partner_user',
            path: '/partners/:partner_id/users/:user_id/edit',
        }])


        app.router.addRoutes([{
            children: [{
                component: DeleteUser,
                name: 'delete_client_user',
                path: ':user_id/delete',
            }],
            component: ListUsers,
            name: 'list_client_users',
            path: '/clients/:client_id/users',
        }])
        app.router.addRoutes([{
            children: [{
                component: DeleteUser,
                name: 'delete_partner_user',
                path: ':user_id/delete',
            }],
            component: ListUsers,
            name: 'list_partner_users',
            path: '/partners/:partner_id/users',
        }])
    }

    getObservables() {
        return {
            credentials: {
                email: null,
                password: null,
            },
            user: {
                client: null,
                email: null,
                groups: [],
                old_password: '',
                partner: null,
                password: '',
                password_confirm: '',
                profile: {
                    description: '',
                    first_name: '',
                    language: '',
                    last_name: '',
                    preposition: '',
                },
                session_expiry: true,
            },
            users: [],
        }
    }
}

module.exports = UsersModule
