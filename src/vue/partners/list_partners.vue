<div class="content-page">
    <router-view></router-view>
    <div class="table-header">
        <div class="table-header-title">{{$t('Partners')}} ({{partners.count}})</div>
        <div class="is-grouped is-pulled-right field is-grouped">
            <p class="control">
                <router-link class="button is-primary" :to="{name: 'add_partner'}">
                    <span class="icon"><i class="fa fa-plus"></i></span>
                    <span>{{$t('Add Partner')}}</span>
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
            <tr v-for="partner in partners.results">
                <td>
                    <router-link @click.native="selectPartnerContext(partner)" :to="{name: 'list_clients', params: {partner_id: partner.id}}">{{partner.name}}</router-link>
                </td>
                <td>{{partner.description}}</td>
                <td class="table-actions">
                    <router-link :to="{name: 'edit_partner', params: {partner_id: partner.id}}">
                        <i class="fa fa-edit"></i>
                    </router-link>
                    <router-link :to="{name: 'delete_partner', params: {partner_id: partner.id}, query: $router.currentRoute.query}">
                        <i class="fa fa-remove"></i>
                    </router-link>
                </td>
            </tr>
            <tr v-if="partners.results && partners.results.length === 0">
                <td colspan="3">{{$t('No partners yet')}}</td>
            </tr>
        </tbody>
    </table>
    <Pagination
        :count=partners.count
        :method=fetchData
        :path="$router.currentRoute.path">
    </Pagination>
</div>
