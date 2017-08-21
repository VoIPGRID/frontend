<div>
    <Tabs :tabs=tabs :fetch=fetchData>
        <Tab :data="tabs[0]">
            <h2 class="title">{{$t('General')}}</h2><hr/>

            <Field name="owner" type="select"
                :help="$t('This allows for reseller-style relationships. Unset for the system owner.')"
                :label="$t('Owner')"
                :model.sync="partner.owner"
                :options="root.owners"
                :placeholder="$t('Select an owner...')"/>

            <Field name="name" type="text"
                :help="$t('The relation name: a company name or a person name ' +
                'in case of a private person.')"
                :label="$t('Name')"
                :model.sync="partner.name"
                :placeholder="$t('Name')"
                :validation="$v.partner.name"/>

            <Field name="description" type="textarea"
                :label="$t('Description')"
                :model.sync="partner.description"
                :placeholder="$t('Name')"
                :validation="$v.partner.description"/>

            <Field name="foreign_code" type="text"
                :help="$t('A human readable identifier that the relation uses to identify you by.')"
                :label="$t('Foreign code')"
                :model.sync="partner.foreign_code"
                :placeholder="$t('Foreign code')"
                :validation="$v.partner.foreign_code"/>

            <Field name="may_have_children" type="checkbox"
                :label="$t('May have children')"
                :model.sync="partner.may_have_children"/>

            <h2 class="title">{{$t('Domains')}}</h2><hr/>

            <Field name="domain" type="text"
                :help="$t('E.g. your.hostname')"
                :label="$t('Domain')"
                :model.sync="partner.domain"
                :placeholder="$t('Domain')"/>

            <Field name="email_address" type="text"
                :label="$t('Email address')"
                :model.sync="partner.email_address"
                :placeholder="$t('Emailaddress')"
                :validation="$v.partner.email_address"/>

            <Field name="no_reply_email_address" type="text"
                :help="$t('Address to be used for sending out notifications.')"
                :label="$t('No-reply emailaddress')"
                :model.sync="partner.no_reply_email_address"
                :placeholder="$t('No-reply emailaddress')"
                :validation="$v.partner.no_reply_email_address"/>

            <Field name="registration_domain" type="text"
                :help="$t('The domain name client phones use as proxy address. E.g. proxy_hostname')"
                :label="$t('Registration domain')"
                :model.sync="partner.registration_domain"
                :placeholder="$t('Registration domain')"/>

            <Field name="wiki_base_url" type="text"
                :help="$t('E.g. https://wiki.voipgrid.nl/index.php/')"
                :label="$t('Base url of the wiki')"
                :model.sync="partner.wiki_base_url"
                :placeholder="$t('E.g. https://wiki.voipgrid.nl/index.php/')"
                :validation="$v.partner.wiki_base_url"/>

            <h2 class="title">{{$t('Branding')}}</h2><hr/>

            <Field name="favicon" type="file"
                :help="$t('A favicon for this partner.')"
                :label="$t('Favicon')"
                :model.sync="partner.favicon"/>

            <Field name="logo" type="file"
                :help="$t('A logo for a custom look-and-feel for this partner.')"
                :label="$t('Logo')"
                :model.sync="partner.logo"/>

            <Field name="branding" type="checkbox"
                :click="toggleBranding"
                :label="$t('Use custom branding')"
                :model.sync="branding"/>

            <nav class="level">
                <div class="level-item has-text-centered">
                    <Field name="branding" type="color"
                        :disabled="!branding"
                        :label="$t('Text')"
                        :model.sync="partner.text"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="brand" type="color"
                        :disabled="!branding"
                        :label="$t('Navigation bar')"
                        :model.sync="partner.brand"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="navlink" type="color"
                        :disabled="!branding"
                        :label="$t('Navigation link')"
                        :model.sync="partner.navlink"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="navlink_active" type="color"
                        :disabled="!branding"
                        :label="$t('Active navigation link')"
                        :model.sync="partner.navlink_active"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="spot" type="color"
                        :disabled="!branding"
                        :label="$t('Hyperlink')"
                        :model.sync="partner.spot"/>
                </div>
                <div class="level-item has-text-centered">
                    <Field name="btn_text" type="color"
                        :disabled="!branding"
                        :label="$t('Button text')"
                        :model.sync="partner.btn_text"/>
                </div>
            </nav>
        </Tab>

        <Tab :data="tabs[1]" v-if="partner.profile">
            <Field idfield="code" name="country" type="select" v-if="partner.profile.country"
                :help="$t('Select the country you operate from. When possible this country will ' +
                'be the default in other forms.')" :label="$t('Country')"
                :model.sync="partner.profile.country.code"
                :options="root.countries"
                :placeholder="$t('Select a country...')"
                :validation="$v.partner.profile.country.code"/>

            <Field name="audio_language" type="select"
                :help="$t('Select the language/voice that is used as default for messages ' +
                'played in modules.')" :label="$t('Audio language')"
                :model.sync="partner.profile.audio_language"
                :options="root.audioLanguages"
                :placeholder="$t('Select an audio language...')"
                :validation="$v.partner.profile.audio_language"/>

            <Field name="system_language" type="select"
                :help="$t('Select the language that is used as default for printed text ' +
                '(invoices, exports, interface).')" :label="$t('System language')"
                :model.sync="partner.profile.system_language"
                :options="root.systemLanguages"
                :placeholder="$t('Select a system language...')"
                :validation="$v.partner.profile.system_language"/>

            <Field name="timezone" type="select" v-if="partner.profile"
                :label="$t('Timezone')"
                :model.sync="partner.profile.timezone"
                :options="root.timezones"
                :placeholder="$t('Select a timezone...')"
                :validation="$v.partner.profile.timezone"/>
        </Tab>

        <Tab :data="tabs[2]" v-if="partner.billingprofile">
            <Field name="currency" namefield="code" type="select"
                :label="$t('Currency')"
                :model.sync="partner.billingprofile.currency"
                :options="root.currencies"
                :placeholder="$t('Select a currency...')"
                :validation="$v.partner.billingprofile.currency"/>

            <Field name="billing_email" type="text" v-if="partner.billingprofile"
                :label="$t('Email address for billing')"
                :model.sync="partner.billingprofile.billing_email"
                :placeholder="$t('Email address for billing')"
                :validation="$v.partner.billingprofile.billing_email"/>

            <Field name="totalize_partner_cdrs" type="checkbox" v-if="partner.billingprofile"
                :help="$t('When checked, this partner receives a single invoice from the system for all its clients. ' +
                'Otherwise, its clients receive invoices from the system.')"
                :label="$t('Does its own billing')"
                :model.sync="partner.billingprofile.totalize_partner_cdrs"/>

            <Field name="use_twinfield" type="checkbox" v-if="partner.billingprofile"
                :help="$t('When checked, the partner can export his billing items to twinfield.')"
                :label="$t('Use twinfield')"
                :model.sync="partner.billingprofile.use_twinfield"/>

            <Field name="auto_export" type="checkbox" v-if="partner.billingprofile"
                :help="$t(`A combined export will be created and emailed on the first day of every month.`)"
                :label="$t('Automatic export')"
                :model.sync="partner.billingprofile.auto_export"/>

            <Field name="exclude_from_export" type="checkbox" v-if="partner.billingprofile"
                :help="$t('This relation will be excluded from billing exports.')"
                :label="$t('Exclude from billing')"
                :model.sync="partner.billingprofile.exclude_from_export"/>

            <Field name="priceplan_discount_status" type="select"
                :help="$t('The discount status used for priceplan generation.')"
                :label="$t('Priceplan discount status')"
                :model.sync="partner.billingprofile.priceplan_discount_status"
                :options="root.priceplanDiscounts"
                :placeholder="$t('Select a discount...')"/>
        </Tab>
        <div class="field is-grouped margin-top-1">
            <p class="control">
                <button class="button is-primary" :disabled="$v.$invalid" @click="upsertPartner(partner)">
                    {{$t('Save changes')}}
                </button>
            </p>
            <p class="control">
                <router-link class="button" :to="$helpers.lastRoute('list_partners')">{{$t('Cancel')}}</router-link>
            </p>
        </div>
    </Tabs>


</div>
