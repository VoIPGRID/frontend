<Tabs :tabs=tabs class="content-page">
    <template slot="tablist">
        <i class="fa fa-group"></i>
        <span v-once>{{phoneaccount.name}}</span>
    </template>

    <Tab slot="tabs" :data="tabs[0]">
        <h4>{{$t('Credentials')}}</h4>
        <Field name="account_id" type="text" disabled="disabled"
            :label="$t('Account ID')"
            :model.sync="phoneaccount.account_id"
            :validation="$v.phoneaccount.account_id"/>

        <Field name="password" type="text" disabled="disabled"
            :label="$t('Password')"
            :model.sync="phoneaccount.password"/>

        <Field name="description" type="textarea"
            :label="$t('Description')"
            :model.sync="phoneaccount.description"
            :placeholder="$t('Name')"
            :validation="$v.phoneaccount.description"/>
        <hr/>

        <h4>{{$t('Identification')}}</h4>
        <Field name="internal_number" type="text"
            :label="$t('Internal number')"
            :model.sync="phoneaccount.internal_number"/>

        <Field name="callerid_name" type="text"
            :help="$t('Note: special characters can\'t be used with Gigaset.')"
            :label="$t('Outgoing name')"
            :model.sync="phoneaccount.callerid_name"
            :validation="$v.phoneaccount.callerid_name"/>

        <Field name="callerid_number" type="text"
            :help="$t('Only a phone number that is listed in the phone number list can be supplied here. When left empty, the first number of the phone number list will be used.')"
            :label="$t('Outgoing number (Caller ID)')"
            :model.sync="phoneaccount.callerid_number"
            :validation="$v.phoneaccount.callerid_number"/>
        <hr/>

        <h4>{{$t('Country-specific')}}</h4>
        <Field idfield="code" name="country" type="select"
            :label="$t('Calling code')"
            :model.sync="phoneaccount.country.code"
            :options="root.calling_codes"
            :placeholder="$t('Select a country...')"
            :validation="$v.phoneaccount.country.code"/>

        <Field name="n112_region" type="select" v-if="phoneaccount.country.code === 'nl'"
            :label="$t('112 region')"
            :model.sync="phoneaccount.n112_region.id"
            :options="root.regions_112"
            :placeholder="$t('Select a 112 region...')"
            :validation="$v.phoneaccount.n112_region.id"/>

        <Field name="suppress_callerid" type="checkbox"
            :label="$t('Suppress Caller ID')"
            :model.sync="phoneaccount.suppress_callerid"/>

    </Tab>

    <Tab slot="tabs" :data="tabs[1]">
        <em>Not implemented yet</em>
    </Tab>

    <template slot="controls">
        <p class="control">
            <button class="button is-primary" :disabled="$v.$invalid" @click="upsertPhoneaccount($router.currentRoute.params.client_id, phoneaccount)">
                {{$t('Save changes')}}
            </button>
        </p>
        <p class="control">
            <router-link class="button"
                :to="$helpers.lastRoute('list_phoneaccounts', {partner_id: $router.currentRoute.params.partner_id})">
                {{$t('Cancel')}}
            </router-link>
        </p>
    </template>
</Tabs>
