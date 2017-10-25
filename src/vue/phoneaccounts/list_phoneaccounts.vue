<div class="content-page">
    <router-view></router-view>

    <div class="table-header">
        <div class="table-header-title">{{$t('VoIP accounts')}} ({{phoneaccounts.count}})</div>
        <div class="is-grouped is-pulled-right field is-grouped">
            <p class="control">
                <router-link class="button is-primary"
                    :to="{name: 'add_phoneaccount'}">
                    <span class="icon"><i class="fa fa-plus"></i></span>
                    <span>{{$t('Add VoIP account')}}</span>
                </router-link>
            </p>
        </div>
    </div>

    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>{{$t('Name')}}</th>
                <th>{{$t('Account Id')}}</th>
                <th>{{$t('Password')}}</th>
                <th class="col-sm-2">{{$t('Actions')}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="phoneaccount in phoneaccounts.results">
                <td>{{phoneaccount.description}}</td>
                <td>{{phoneaccount.account_id}}</td>
                <td>{{phoneaccount.password}}</td>
                <td class="table-actions">
                    <router-link :to="{name: 'edit_phoneaccount', params: {phoneaccount_id: phoneaccount.id}}">
                        <span class="icon"><i class="fa fa-edit"></i></span>
                    </router-link>
                    <router-link :to="{name: 'delete_phoneaccount', params: {phoneaccount_id: phoneaccount.id}, query: $router.currentRoute.query}">
                        <span class="icon"><i class="fa fa-remove"></i></span>
                    </router-link>
                </td>
            </tr>
            <tr v-if="phoneaccounts.results && phoneaccounts.results.length === 0">
                <td colspan="3">{{$t('No VoIP accounts yet')}}</td>
            </tr>
        </tbody>
    </table>

    <Pagination
        :count=phoneaccounts.count
        :method=fetchData
        :path="$router.currentRoute.path">
    </Pagination>
</div>
