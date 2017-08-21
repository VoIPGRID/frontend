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

        app.router.addRoutes([{
            alias: '/logout',
            component: require('./components/login')(app, this.actions),
            name: 'user_login',
            path: '/login',
        }])

        // The same components are shared for partner and client users. Only
        // the routings defer.
        const AddEditUser = Vue.component('AddEditUser', require('./components/add-edit_user')(app, this.actions))
        app.router.addRoutes([{
            alias: [
                '/clients/:client_id/users/add/personal',
                '/clients/:client_id/users/add/telephony',
                '/clients/:client_id/users/add/language',
                '/clients/:client_id/users/add/security',
            ],
            component: AddEditUser,
            name: 'add_client_user',
            path: '/clients/:client_id/users/add',

        }])
        app.router.addRoutes([{
            alias: [
                '/clients/:client_id/users/:user_id/edit/personal',
                '/clients/:client_id/users/:user_id/edit/telephony',
                '/clients/:client_id/users/:user_id/edit/language',
                '/clients/:client_id/users/:user_id/edit/security',
            ],
            component: AddEditUser,
            name: 'edit_client_user',
            path: '/clients/:client_id/users/:user_id/edit',
        }])


        app.router.addRoutes([{
            alias: [
                '/partners/:partner_id/users/add/personal',
                '/partners/:partner_id/users/add/telephony',
                '/partners/:partner_id/users/add/language',
                '/partners/:partner_id/users/add/security',
            ],
            component: AddEditUser,
            name: 'add_partner_user',
            path: '/partners/:partner_id/users/add',
        }])
        app.router.addRoutes([{
            alias: [
                '/partners/:partner_id/users/:user_id/edit/personal',
                '/partners/:partner_id/users/:user_id/edit/telephony',
                '/partners/:partner_id/users/:user_id/edit/language',
                '/partners/:partner_id/users/:user_id/edit/security',
            ],
            component: AddEditUser,
            name: 'edit_partner_user',
            path: '/partners/:partner_id/users/:user_id/edit',
        }])


        app.router.addRoutes([{
            children: [{
                component: Vue.component('DeleteUser', require('./components/delete_user')(app, this.actions)),
                name: 'delete_client_user',
                path: ':user_id/delete',
            }],
            component: Vue.component('ListUsers', require('./components/list_users')(app, this.actions)),
            name: 'list_client_users',
            path: '/clients/:client_id/users',
        }])
        app.router.addRoutes([{
            children: [{
                component: Vue.component('DeleteUser', require('./components/delete_user')(app, this.actions)),
                name: 'delete_partner_user',
                path: ':user_id/delete',
            }],
            component: Vue.component('ListUsers', require('./components/list_users')(app, this.actions)),
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
