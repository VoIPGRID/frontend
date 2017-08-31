<Tabs :tabs=tabs>
    <template slot="tablist">
        <i class="fa fa-group"></i>
        <span v-once>{{phoneaccount.name}}</span>
    </template>

    <Tab slot="tabs" :data="tabs[0]">
        <h4>{{$t('VoIP account')}}</h4>

        <Field name="description" type="textarea"
            :label="$t('Description')"
            :model.sync="phoneaccount.description"
            :placeholder="$t('Name')"
            :validation="$v.phoneaccount.description"/>


        <hr/>

    </Tab>

    <Tab slot="tabs" :data="tabs[1]">

    </Tab>

    <template slot="controls">
        <p class="control">
            <button class="button is-primary" :disabled="$v.$invalid" @click="upsertPhoneaccount(phoneaccount)">
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
