import {actions} from './actions.mjs'
import {Module} from '../../lib/module.mjs'

import {AddEditUser} from './components/add-edit_user.mjs'
import {DeleteUser} from './components/delete_user.mjs'
import {ListUsers} from './components/list_users.mjs'
import {Login} from './components/login.mjs'

/**
* @module user
*/

/**
* The user app handles profile-related functionality.
*/
export class UsersModule extends Module {
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

        this.actions = actions(app, this)

        const addEditUser = Vue.component('AddEditUser', AddEditUser(app, this.actions))
        const deleteUser = Vue.component('DeleteUser', DeleteUser(app, this.actions))
        const listUsers = Vue.component('ListUsers', ListUsers(app, this.actions))
        const login = Vue.component('Login', Login(app, this.actions))

        app.router.addRoutes([{
            alias: '/logout',
            component: login,
            name: 'user_login',
            path: '/login',
        }])

        app.router.addRoutes([{
            component: addEditUser,
            meta: {
                breadcrumbs: ['Users'],
            },
            name: 'add_client_user',
            path: '/partners/:partner_id/clients/:client_id/users/add',
        }])
        app.router.addRoutes([{
            component: addEditUser,
            meta: {
                breadcrumbs: ['Users'],
            },
            name: 'add_partner_user',
            path: '/partners/:partner_id/users/add',
        }])


        app.router.addRoutes([{
            component: addEditUser,
            meta: {
                breadcrumbs: ['Users'],
            },
            name: 'edit_client_user',
            path: '/partners/:partner_id/clients/:client_id/users/:user_id/edit',
        }])
        app.router.addRoutes([{
            component: addEditUser,
            meta: {
                breadcrumbs: ['Users'],
            },
            name: 'edit_partner_user',
            path: '/partners/:partner_id/users/:user_id/edit',
        }])


        app.router.addRoutes([{
            children: [{
                component: deleteUser,
                name: 'delete_client_user',
                path: ':user_id/delete',
            }],
            component: listUsers,
            meta: {
                breadcrumbs: ['Users'],
            },
            name: 'list_client_users',
            path: '/partners/:partner_id/clients/:client_id/users',
        }])
        app.router.addRoutes([{
            children: [{
                component: deleteUser,
                name: 'delete_partner_user',
                path: ':user_id/delete',
            }],
            component: listUsers,
            meta: {
                breadcrumbs: ['Users'],
            },
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
            userdestinations: [],
            users: [],
        }
    }
}
