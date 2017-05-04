<div>
    <router-view></router-view>
    <div class="field is-grouped">
        <p class="control">
            <router-link class="button is-primary" to="/clients/add/">Add Client</router-link>
        </p>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th class="col-sm-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="client in clients">
                <td>
                    {{client.name}}
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
        </tbody>
    </table>
</div>
