<div>
    <Tabs class="container">
        <Tab id="partner" :title="$t('Partner')">
            <h2 class="title">General</h2><hr/>
            <div class="field">
                <label class="label" for="owner">{{$t('Owner')}}</label>
                <span class="select">
                    <select id="owner" class="select" name="owner" type="text" :placeholder="$t('Owner')" v-model="partner.owner">
                        <option value="" disabled>Select an owner...</option>
                        <option v-for="option in partner.owners" v-bind:value="option.id">
                        {{ option.name }}
                        </option>
                    </select>
                </span>
            </div>

            <div class="field">
                <label class="label" for="name">{{$t('Name')}}</label>
                <input id="name" name="name" type="text" :placeholder="$t('Name')"
                v-model.trim="partner.name" :class="{'input': true, 'is-danger': $v.partner.name.$error}"
                @input="$v.partner.name.$touch()"
                />
                <span class="help is-danger" v-if="$v.partner.name.$error && $v.partner.name.$dirty">
                Field is required and must be at least 3 characters
                </span>
            </div>

            <div class="field">
                <label class="label" for="description">{{$t('Description')}}</label>
                <textarea id="description" class="textarea" v-model="partner.description" :placeholder="$t('Description')"/>
            </div>

            <div class="field">
                <label class="label" for="foreign_code">{{$t('Foreign code')}}</label>
                <input id="foreign_code" name="foreign_code" type="text" :placeholder="$t('Foreign code')"
                v-model.trim="partner.foreign_code" :class="{'input': true, 'is-danger': $v.partner.foreign_code.$error}"
                @input="$v.partner.foreign_code.$touch()"
                />
                <span class="help is-danger" v-if="$v.partner.foreign_code.$error && $v.partner.foreign_code.$dirty">
                Field is required and must be at least 16 characters
                </span>
            </div>

            <div class="field">
                <p class="control">
                    <input v-model="partner.may_have_children" id="may_have_children" type="checkbox" />
                    <label for="may_have_children" class="checkbox">
                        May have children
                    </label>
                </p>
            </div>

            <h2 class="title">Domains</h2><hr/>

            <div class="field">
                <label class="label" for="domain">{{$t('Domain')}}</label>
                <input id="domain" name="domain" type="text" :placeholder="$t('Domain')"
                v-model="partner.domain" class="input"/>
                <p class="help">e.g. mydomain.ext</p>
            </div>

            <div class="field">
                <label class="label" for="no_reply_email_address">{{$t('Emailaddress')}}</label>
                <input id="no_reply_email_address" name="no_reply_email_address" type="text" :placeholder="$t('Emailaddress')"
                v-model="partner.email_address" class="input"/>
            </div>

            <div class="field">
                <label class="label" for="no_reply_email_address">{{$t('No-reply emailaddress')}}</label>
                <input id="no_reply_email_address" name="no_reply_email_address" type="text" :placeholder="$t('Emailaddress')"
                v-model="partner.no_reply_email_address" class="input"/>
            </div>

            <div class="field">
                <label class="label" for="registration_domain">{{$t('Registration domain')}}</label>
                <input id="registration_domain" name="registration_domain" type="text"
                v-model="partner.registration_domain" class="input"/>
            </div>

            <div class="field">
                <label class="label" for="wiki_base_url">{{$t('Base url of the wiki')}}</label>
                <input id="wiki_base_url" name="wiki_base_url" type="text" :placeholder="`${$t('e.g.')} https://wiki.voipgrid.nl/index.php/`"
                v-model="partner.wiki_base_url" class="input"/>
            </div>

            <h2 class="title">Branding</h2><hr/>

            <div class="field">
                <label class="label" for="favicon">{{$t('Favicon')}}</label>
                <input type="file" />
            </div>

            <div class="field">
                <label class="label" for="logo">{{$t('Logo')}}</label>
                <input type="file" />
            </div>

            <div class="field">
                <p class="control">
                    <input type="checkbox" id="branding" v-model="branding" @click="toggleBranding" />
                    <label for="branding" class="checkbox">
                        {{$t('Use custom branding')}}
                    </label>
                </p>
            </div>

            <nav class="level">
              <div class="level-item has-text-centered">
                  <div class="field">
                      <label v-model="partner.text" class="label" for="text">{{$t('Text')}}</label>
                      <input :disabled="!branding" type="color" v-model="partner.text" class="input"/>
                  </div>
              </div>
              <div class="level-item has-text-centered">
                  <div class="field">
                      <label v-model="partner.brand" class="label" for="brand">{{$t('Navigation bar')}}</label>
                      <input :disabled="!branding" type="color" v-model="partner.brand" class="input"/>
                  </div>
              </div>
              <div class="level-item has-text-centered">
                  <div class="field">
                      <label v-model="partner.navlink" class="label" for="navlink">{{$t('Navigation link')}}</label>
                      <input :disabled="!branding" type="color" v-model="partner.navlink" class="input"/>
                  </div>
              </div>
              <div class="level-item has-text-centered">
                  <div class="field">
                      <label v-model="partner.navlink_active" class="label" for="navlink_active">{{$t('Active navigation link')}}</label>
                      <input :disabled="!branding" type="color" v-model="partner.navlink_active" class="input"/>
                  </div>
              </div>
              <div class="level-item has-text-centered">
                  <div class="field">
                      <label v-model="partner.spot" class="label" for="spot">{{$t('Hyperlink')}}</label>
                      <input :disabled="!branding" type="color" v-model="partner.spot" class="input"/>
                  </div>
              </div>
              <div class="level-item has-text-centered">
                  <div class="field">
                      <label v-model="partner.btn_text" class="label" for="btn_text">{{$t('Button text')}}</label>
                      <input :disabled="!branding" type="color" v-model="partner.btn_text" class="input"/>
                  </div>
              </div>
            </nav>

        </Tab>

        <Tab id="preferences" :title="$t('Preferences')">
            <div class="field">
                <label class="label" for="owner">{{$t('Country')}}</label>
                <span class="select">
                    <select id="owner" class="select" name="owner" type="text" :placeholder="$t('Owner')" v-model="partner.owner">
                        <option value="" disabled>Select an owner...</option>
                        <option v-for="option in partner.owners" v-bind:value="option.id">
                        {{ option.name }}
                        </option>
                    </select>
                </span>
            </div>
        </Tab>

        <Tab id="billing" :title="$t('Billing Preferences')">
            <p>Content C</p>
        </Tab>
    </Tabs>

    <div class="field is-grouped margin-top-1">
        <p class="control">
            <button class="button is-primary" :disabled="!formIsValid" @click="$store.dispatch('partners/upsertPartner')">
                {{$t('Save changes')}}
            </button>
        </p>
        <p class="control">
            <router-link class="button" :to="$helpers.lastRoute('list_partners')">{{$t('Cancel')}}</router-link>
        </p>
    </div>
</div>
