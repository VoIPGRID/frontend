<div>
    <router-view></router-view>
    <div class="table-options field is-grouped is-pulled-right">
        <p class="control">
            <router-link class="button is-primary" :to="{name: 'add_user', params: {client_id: $route.params.client_id}}">
                {{$t('Add User')}}
            </router-link>
        </p>
    </div>
    <table class="table is-fullwidth is-striped">
        <thead>
            <tr>
                <th>{{$t('Email')}}</th>
                <th>{{$t('Description')}}</th>
                <th class="col-sm-2">{{$t('Actions')}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td>
                    <a>{{user.email}}</a>
                </td>
                <td>{{user.profile.description}}</td>
                <td>
                    <router-link :to="{name: 'edit_user', params: {client_id: $route.params.client_id, user_id: user.id}}">
                        <span class="icon">
                            <i class="fa fa-edit"></i>
                        </span>
                    </router-link>
                    <router-link :to="{name: 'delete_user', params: {client_id: $route.params.client_id, user_id: user.id}}">
                        <span class="icon">
                            <i class="fa fa-remove"></i>
                        </span>
                    </router-link>
                </td>
            </tr>
            <tr v-if="users.length === 0">
                <td colspan="3">{{$t('No users yet')}}</td>
            </tr>
        </tbody>
    </table>
    <paginator
        :count=users.count
        :next=users.next
        :previous=users.previous
        :resource_action=readUsers
        :resource_url="'/clients/' + $route.params.client_id + '/users/'">
    </paginator>
</div>
