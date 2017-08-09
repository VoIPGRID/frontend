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
        this.app.store.users = this.getObservables()
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
        let _state = {
            credentials: {
                email: null,
                password: null,
            },
            currentUser: {
                email: null,
                old_password: '',
                password: '',
                password_confirm: '',
                profile: {
                    last_name: '',
                },
            },
            user: {
                authenticated: false,
                client: null,
                csrf: null,
                id: null,
                language: 'en',
                partner: null,
                superuser: false,
            },
            users: [],
        }

        Object.assign(_state.user, JSON.parse(JSON.stringify(this.app.__state)))
        return _state
    }
}

module.exports = UsersModule
