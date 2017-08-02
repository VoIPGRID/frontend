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
            path: '/login',
            alias: '/logout',
            name: 'user_login',
            component: require('./components/login')(app, this.actions),
        }])

        app.router.addRoutes([{
            path: '/profile',
            name: 'user_profile',
            component: Vue.component('UserProfile', require('./components/profile')(app, this.actions)),
        }])

        app.router.addRoutes([{
            path: '/clients/:client_id/users',
            name: 'list_users',
            component: Vue.component('ListUsers', require('./components/list_users')(app, this.actions)),
            children: [
                {
                    path: ':user_id/delete',
                    name: 'delete_user',
                    component: Vue.component('DeleteUser', require('./components/delete_user')(app, this.actions)),
                },
            ],
        }])

        const AddEditUser = Vue.component('AddEditUser', require('./components/add-edit_user')(app, this.actions))

        app.router.addRoutes([{
            path: '/clients/:client_id/users/add',
            name: 'add_user',
            component: AddEditUser,
        }])

        app.router.addRoutes([{
            path: '/clients/:client_id/users/:user_id/edit',
            name: 'edit_user',
            component: AddEditUser,
        }])
    }


    getObservables() {
        let _state = {
            credentials: {
                email: '',
                password: '',
            },
            user: {
                profile: {},
                old_password: '',
                password: '',
                password_confirm: '',
            },
            users: [],
        }

        Object.assign(_state.user, JSON.parse(JSON.stringify(this.app.__state)))
        return _state
    }
}

module.exports = UsersModule
