<div>
    <Tabs class="container">
        <Tab id="partner" :title="$t('Partner')">
            <h2 class="title">General</h2><hr/>

            <Field name="owner" type="select" :label="$t('Owner')" :model.sync="partner.owner"
                :options="owners" :placeholder="$t('Select an owner...')"/>

            <Field name="name" type="text" :label="$t('Name')" :model.sync="partner.name"
                :placeholder="$t('Name')" :validation="$v.partner.name"/>

            <Field name="description" type="textarea" :label="$t('Description')"
                :model.sync="partner.description" :placeholder="$t('Name')"
                :validation="$v.partner.description"/>

            <Field name="foreign_code" type="text" :label="$t('Foreign code')"
                :model.sync="partner.foreign_code" :placeholder="$t('Foreign code')"
                :validation="$v.partner.foreign_code"/>

            <Field name="may_have_children" type="checkbox" :label="$t('May have children')"
                :model.sync="partner.may_have_children"/>

            <h2 class="title">Domains</h2><hr/>

            <Field name="domain" type="text" :help="$t('e.g. mydomain.ext')" :label="$t('Domain')"
                :model.sync="partner.domain" :placeholder="$t('Domain')"/>

            <Field name="email_address" type="text" :label="$t('Emailaddress')"
                :model.sync="partner.email_address" :placeholder="$t('Emailaddress')"
                :validation="$v.partner.email_address"/>

            <Field name="no_reply_email_address" type="text" :label="$t('No-reply emailaddress')"
                :model.sync="partner.no_reply_email_address" :placeholder="$t('No-reply emailaddress')"
                :validation="$v.partner.no_reply_email_address"/>

            <Field name="registration_domain" type="text" :label="$t('Registration domain')"
                :model.sync="partner.registration_domain" :placeholder="$t('Registration domain')"/>

            <Field name="wiki_base_url" type="text" :label="$t('Base url of the wiki')"
                :model.sync="partner.wiki_base_url" :placeholder="`${$t('e.g.')}
                https://wiki.voipgrid.nl/index.php/`" :validation="$v.partner.wiki_base_url"/>

            <h2 class="title">{{$t('Branding')}}</h2><hr/>

            <div class="field">
                <label class="label" for="favicon">{{$t('Favicon')}}</label>
                <input type="file" />
            </div>

            <div class="field">
                <label class="label" for="logo">{{$t('Logo')}}</label>
                <input type="file" />
            </div>

            <Field name="branding" type="checkbox" :click="toggleBranding"
                :label="$t('Use custom branding')" :model.sync="branding"/>

            <nav class="level">
                <div class="level-item has-text-centered">
                    <Field name="branding" type="color" :disabled="!branding"
                        :label="$t('Text')" :model.sync="partner.text"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="brand" type="color" :disabled="!branding" :label="$t('Navigation bar')"
                        :model.sync="partner.brand"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="navlink" type="color" :disabled="!branding" :label="$t('Navigation link')"
                        :model.sync="partner.navlink"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="navlink_active" type="color" :disabled="!branding" :label="$t('Active navigation link')"
                        :model.sync="partner.navlink_active"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="spot" type="color" :disabled="!branding" :label="$t('Hyperlink')"
                        :model.sync="partner.spot"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="btn_text" type="color" :disabled="!branding" :label="$t('Button text')"
                        :model.sync="partner.btn_text"/>
                </div>
                </nav>
        </Tab>

        <Tab id="preferences" :title="$t('Preferences')">
            <Field idfield="code" name="country" type="select" v-if="partner.profile.country"
                :help="$t(`Select the country you operate from. When possible this country will be
                the default in other forms.`)" :label="$t('Country')"
                :model.sync="partner.profile.country.code" :options="countries"
                :placeholder="$t('Select an owner...')"/>

            <Field name="audio_language" v-if="partner.profile" type="select"
                :label="$t('Audio language')" :model.sync="partner.profile.audio_language"
                :options="audioLanguages" :placeholder="$t('Select an audio language...')"
                :help="$t(`Select the language/voice that is used as default for messages
                played in modules.`)"/>

            <Field name="system_language" type="select"
                :help="$t(`Select the language that is used as default for printed text
                (invoices, exports, interface).`)" :label="$t('System language')"
                :model.sync="partner.profile.system_language" :options="systemLanguages"
                :placeholder="$t('Select a system language...')"/>

            <Field name="timezone" type="select" v-if="partner.profile" :label="$t('Timezone')"
                :model.sync="partner.profile.timezone" :options="timezones"
                :placeholder="$t('Select a timezone...')"/>
        </Tab>

        <Tab id="billing" :title="$t('Billing Preferences')">
            <Field name="currency" namefield="code" type="select" :label="$t('System language')"
                :model.sync="partner.billingprofile.currency" :options="currencies"
                :placeholder="$t('Select a currency...')"/>

            <Field name="billing_email" type="text" v-if="partner.billingprofile"
                :label="$t('Email address for billing')"
                :model.sync="partner.billingprofile.billing_email" :placeholder="$t('Email address for billing')"
                :validation="$v.partner.billingprofile.billing_email"/>

            <Field name="totalize_partner_cdrs" type="checkbox" v-if="partner.billingprofile"
                :help="$t(`When checked, this partner receives a single invoice from the system for
                all its clients. Otherwise, its clients receive invoices from the system.`)"
                :label="$t('Does its own billing')" :model.sync="partner.billingprofile.totalize_partner_cdrs"/>

            <Field name="use_twinfield" type="checkbox" v-if="partner.billingprofile"
                :help="$t(`When checked, the partner can export his billing items to twinfield.`)"
                :label="$t('Use twinfield')" :model.sync="partner.billingprofile.use_twinfield"/>

            <Field name="auto_export" type="checkbox" v-if="partner.billingprofile"
                :help="$t(`A combined export will be created and emailed on the first day of every month.`)"
                :label="$t('Automatic export')" :model.sync="partner.billingprofile.auto_export"/>

            <Field name="exclude_from_export" type="checkbox" v-if="partner.billingprofile"
                :help="$t(`This relation will be excluded from billing exports.`)"
                :label="$t('Exclude from billing')" :model.sync="partner.billingprofile.exclude_from_export"/>
        </Tab>
    </Tabs>

    <div class="field is-grouped margin-top-1">
        <p class="control">
            <button class="button is-primary" :disabled="!formIsValid"
            @click="$store.dispatch('partners/upsertPartner')">
                {{$t('Save changes')}}
            </button>
        </p>
        <p class="control">
            <router-link class="button" :to="$helpers.lastRoute('list_partners')">{{$t('Cancel')}}</router-link>
        </p>
    </div>
</div>
