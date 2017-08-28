<div>
    <router-view></router-view>
    <div class="table-options field is-grouped is-pulled-right">
        <p class="control">
            <router-link v-if="clientId" class="button is-primary" :to="{name: 'add_client_user', params: {client_id: clientId}}">
                {{$t('Add User')}}
            </router-link>
            <router-link v-else class="button is-primary" :to="{name: 'add_partner_user', params: {partner_id: partnerId}}">
                {{$t('Add User')}}
            </router-link>
        </p>
    </div>
    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>{{$t('Name')}}</th>
                <th>{{$t('Email')}}</th>
                <th>{{$t('Description')}}</th>
                <th class="col-sm-2">{{$t('Actions')}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users.results">
                <td>
                    {{user.profile.first_name}} {{user.profile.last_name}}
                </td>
                <td>
                    {{user.email}}
                </td>
                <td>{{user.profile.description}}</td>
                <td v-if="clientId">
                    <router-link :to="{name: 'edit_client_user', params: {client_id: clientId, user_id: user.id}}">
                        <span class="icon"><i class="fa fa-edit"></i></span>
                    </router-link>
                    <router-link :to="{name: 'delete_client_user', params: {client_id: clientId, user_id: user.id}, query: $router.currentRoute.query}">
                        <span class="icon"><i class="fa fa-remove"></i></span>
                    </router-link>
                </td>
                <td v-else>
                    <router-link :to="{name: 'edit_partner_user', params: {partner_id: partnerId, user_id: user.id}}">
                        <span class="icon"><i class="fa fa-edit"></i></span>
                    </router-link>
                    <router-link :to="{name: 'delete_partner_user', params: {partner_id: partnerId, user_id: user.id}, query: $router.currentRoute.query}">
                        <span class="icon"><i class="fa fa-remove"></i></span>
                    </router-link>
                </td>
            </tr>
            <tr v-if="users.results && users.results.length === 0">
                <td colspan="3">{{$t('No users yet')}}</td>
            </tr>
        </tbody>
    </table>
    <Paginator
        :count="users.count"
        :method="fetchData"
        :path="resourceUrl">
    </Paginator>
</div>
