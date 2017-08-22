<div>
    <router-view></router-view>
    <div class="table-options field is-grouped is-pulled-right">
        <p class="control">
            <router-link class="button is-primary"
                :to="{name: 'add_client', params: {partnerId: $route.params.partner_id}}">
                {{$t('Add Client')}}
            </router-link>
        </p>
    </div>
    <table class="table is-fullwidth is-striped">
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
                        :to="{name: 'list_clients', params: {partner_id: $route.params.partner_id, client_id: client.id}}">
                        {{client.name}}
                    </router-link>
                </td>
                <td>{{ client.description }}</td>
                <td>
                    <router-link :to="{name: 'edit_client', params: {client_id: client.id}}">
                        <span class="icon">
                            <i class="fa fa-edit"></i>
                        </span>
                    </router-link>
                    <router-link :to="{name: 'delete_client', params: {client_id: client.id}}">
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
        path="/clients/">
    </Paginator>
</div>
