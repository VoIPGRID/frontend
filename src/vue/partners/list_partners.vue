<div>
    <router-view></router-view>
    <div class="table-options field is-grouped is-pulled-right">
        <p class="control">
            <router-link class="button is-primary" to="/partners/add/">{{$t('Add Partner')}}</router-link>
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
            <tr v-for="partner in partners.results">
                <td>
                    <a @click="selectPartnerContext(partner)">{{partner.name}}</a>
                </td>
                <td>{{partner.description}}</td>
                <td>
                    <router-link :to="{name: 'edit_partner', params: {partner_id: partner.id}}">
                        <span class="icon">
                            <i class="fa fa-edit"></i>
                        </span>
                    </router-link>
                    <router-link :to="{name: 'delete_partner', params: {partner_id: partner.id}}">
                        <span class="icon">
                            <i class="fa fa-remove"></i>
                        </span>
                    </router-link>
                </td>
            </tr>
            <tr v-if="partners.results.length === 0">
                <td colspan="3">{{$t('No users yet')}}</td>
            </tr>
        </tbody>
    </table>
    <Paginator
        :count=partners.count
        :method=fetchData
        path="/partners/">
    </Paginator>
</div>
