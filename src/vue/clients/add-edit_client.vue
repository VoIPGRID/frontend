<div>
    <Tabs :tabs=tabs>
        <Tab :data="tabs[0]">
            <h2 class="title">{{$t('General')}}</h2><hr/>

            <Field name="owner" type="select"
                :label="$t('Owner')" :model.sync="client.owner"
                :help="$t('This allows for reseller-style relationships. Unset for the system owner.')"
                :options="root.owners"
                :placeholder="$t('Select an owner...')"/>

            <Field name="name" type="text"
                :label="$t('Name')"
                :help="$t('The relation name: a company name or a person name ' +
                'in case of a private person.')"
                :model.sync= "client.name"
                :placeholder="$t('Name')"
                :validation="$v.client.name"/>

            <Field name="description" type="textarea"
                :label="$t('Description')"
                :model.sync="client.description"
                :placeholder="$t('Name')"
                :validation="$v.client.description"/>

            <Field name="foreign_code" type="text"
                :help="$t('A human readable identifier that the relation uses to identify you by.')"
                :label="$t('Foreign code')"
                :model.sync="client.foreign_code"
                :placeholder="$t('Foreign code')"
                :validation="$v.client.foreign_code"/>

            <Field name="anonymize_data" type="checkbox"
                :label="$t('Anonymize conversation data')"
                :model.sync="client.anonymize_data"/>

            <Field name="anonymize_after" type="select"
                :label="$t('Anonymize after')"
                :model.sync="client.anonymize_after"
                :options="root.anonymizeAfter"/>

            <Field name="allow_1xx_extensions" type="checkbox"
                :help="$t('WARNING! Allowing the use of extensions in the 1xx range will make external service ' +
                'numbers in that range unreachable.')"
                :label="$t('Allow 1xx extensions')"
                :model.sync="client.allow_1xx_extensions"/>

            <Field name="allow_public_cliname" type="checkbox"
                :help="$t('Enable to pass along the account outgoing caller id name to external destinations. ' +
                'If disabled, only the outgoing caller id number is sent. (Respecting the `Suppress Caller ID` ' +
                'settings.)')"
                :label="$t('Send outgoing name (Caller ID) to others')"
                :model.sync="client.allow_public_cliname"/>

            <Field name="blocked_call_permissions" type="multiselect" :label="$t('Blocked call permissions')"
                :help="$t('Call permissions that cannot be set in the account forms.')"
                :model.sync="client.blocked_call_permissions"
                :options="root.blockedCallPermissions"
                :placeholder="$t('Disable call permissions...')"/>

            <Field name="server" type="select" :label="$t('Server')" :disabled="true"
                :help="$t('Server is currently unavailable, please try again in a few minutes.')"
                :options="[{id: '', 'name': 'High availability'}]"/>
        </Tab>

        <Tab :data="tabs[1]">
            <Field idfield="code" name="country" type="select"  v-if="client.profile.country"
                :help="$t('Select the country you operate from. When possible this country will ' +
                'be the default in other forms.')"
                :label="$t('Country')"
                :model.sync="client.profile.country.code"
                :options="root.countries"
                :placeholder="$t('Select an owner...')"
                :validation="$v.client.profile.country.code"/>

            <Field name="audio_language" type="select"
                :help="$t('Select the language/voice that is used as default for messages ' +
                'played in modules.')"
                :label="$t('Audio language')"
                :model.sync="client.profile.audio_language"
                :options="root.audioLanguages"
                :placeholder="$t('Select an audio language...')"
                :validation="$v.client.profile.audio_language"/>

            <Field name="system_language" type="select"
                :help="$t('Select the language that is used as default for printed text ' +
                '(invoices, exports, interface).')"
                :label="$t('System language')"
                :model.sync="client.profile.system_language"
                :options="root.systemLanguages"
                :placeholder="$t('Select a system language...')"
                :validation="$v.client.profile.system_language"/>

            <Field name="timezone" type="select" :label="$t('Timezone')"
                :model.sync="client.profile.timezone"
                :options="root.timezones"
                :placeholder="$t('Select a timezone...')"
                :validation="$v.client.profile.timezone"/>
        </Tab>

        <Tab :data="tabs[2]">
            <Field name="currency" namefield="code" type="select"
                :label="$t('Currency')"
                :model.sync="client.billingprofile.currency"
                :options="root.currencies"
                :placeholder="$t('Select a currency...')"
                :validation="$v.client.billingprofile.currency"/>

            <Field name="billing_email" type="text"
                :label="$t('Email address for billing')"
                :model.sync="client.billingprofile.billing_email"
                :placeholder="$t('Email address for billing')"
                :validation="$v.client.billingprofile.billing_email"/>

            <Field name="exclude_from_export" type="checkbox"
                :help="$t('This relation will be excluded from billing exports.')"
                :label="$t('Exclude from billing')"
                :model.sync="client.billingprofile.exclude_from_export"/>
        </Tab>
    </Tabs>
    <div class="field is-grouped margin-top-1 pull-right">
        <p class="control">
            <button class="button is-primary" :disabled="$v.$invalid" @click="upsertClient(client)">
                {{$t('Save changes')}}
            </button>
        </p>
        <p class="control">
            <router-link class="button"
                :to="$helpers.lastRoute('list_clients', {partner_id: $router.currentRoute.params.partner_id})">
                {{$t('Cancel')}}
            </router-link>
        </p>
    </div>
</div>
