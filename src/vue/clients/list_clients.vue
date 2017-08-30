<div>
    <router-view></router-view>

    <div class="table-header">
        <div class="table-header-title">{{$t('Clients')}} ({{clients.count}})</div>
        <div class="is-grouped is-pulled-right field is-grouped">
            <p class="control">
                <router-link class="button is-primary"
                    :to="{name: 'add_client', params: {partnerId: $route.params.partner_id}}">
                    <span class="icon"><i class="fa fa-plus"></i></span>
                    <span>{{$t('Add Client')}}</span>
                </router-link>
            </p>
        </div>
    </div>

    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>{{$t('Name')}}</th>
                <th>{{$t('Description')}}</th>
                <th class="col-sm-2">{{$t('Actions')}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="client in clients.results">
                <td>
                    <router-link @click.native="selectClientContext(client)"
                        :to="{name: 'dashboard_home', params: {partner_id: $route.params.partner_id, client_id: client.id}}">
                        {{client.name}}
                    </router-link>
                </td>
                <td>{{ client.description }}</td>
                <td class="table-actions">
                    <router-link :to="{name: 'edit_client', params: {client_id: client.id}}">
                        <span class="icon">
                            <i class="fa fa-edit"></i>
                        </span>
                    </router-link>
                    <router-link :to="{name: 'delete_client', params: {client_id: client.id}, query: $router.currentRoute.query}">
                        <span class="icon">
                            <i class="fa fa-remove"></i>
                        </span>
                    </router-link>
                </td>
            </tr>
            <tr v-if="clients.results && clients.results.length === 0">
                <td colspan="3">{{$t('No clients yet')}}</td>
            </tr>
        </tbody>
    </table>

    <Paginator
        :count=clients.count
        :method=fetchData
        :path="$router.currentRoute.path">
    </Paginator>
</div>
