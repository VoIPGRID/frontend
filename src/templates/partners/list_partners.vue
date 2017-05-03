<div>
    <router-view></router-view>
    <div class="field is-grouped">
        <p class="control">
            <router-link class="button is-primary" to="/partners/add/">Add Partner</router-link>
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
            <tr v-for="partner in partners">
                <td>
                    {{partner.name}}
                </td>
                <td @click="showLoginError()">{{ partner.description }}</td>
                <td>
                    <router-link :to="{name: 'edit_partner', params: {partner_id: partner.id}}">Edit</router-link>
                    <router-link :to="{name: 'delete_partner', params: {partner_id: partner.id}}">Delete</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</div>
