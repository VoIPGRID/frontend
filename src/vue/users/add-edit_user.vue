<div>
    <Tabs :tabs=tabs :fetch=fetchData>
        <Tab :data="tabs[0]">
            <h2 class="title">{{$t('Personal')}}</h2><hr/>

            <Field name="first_name" type="text"
                :label="$t('First name')"
                :model.sync="user.profile.first_name"
                :validation="$v.user.profile.first_name"/>

            <Field name="preposition" type="text"
                :label="$t('Preposition')"
                :model.sync="user.profile.preposition"/>

            <Field name="last_name" type="text"
                :label="$t('Last name')"
                :model.sync="user.profile.last_name"
                :validation="$v.user.profile.last_name"/>

            <Field v-if="!isProfile" name="email" type="text"
                :label="$t('Email address')"
                :model.sync="user.email"
                :validation="$v.user.email"/>

            <h2 class="title">{{$t('Password')}}</h2><hr/>

            <Field name="old_password" type="password" v-if="isProfile"
                :label="$t('Old password')"
                :model.sync="user.old_password"
                :validation="$v.user.old_password"/>

            <Field name="password" type="password"
                :help="$t('Password should have at least 6 characters and 1 non-alphabetical character.')"
                :label="$t('Password')"
                :model.sync="user.password"
                :validation="$v.user.password"/>

            <Field name="password_confirm" type="password"
                :label="$t('Password confirmation')"
                :model.sync="user.password_confirm"
                :validation="$v.user.password_confirm"/>

            <div class="field is-grouped margin-top-1">
                <p class="control">
                    <button class="button is-primary"
                        :disabled="$v.$invalid"
                        @click="upsertUser(user, $v)">
                        {{$t('Save changes')}}
                    </button>
                </p>
            </div>
        </Tab>

        <Tab :data="tabs[1]">
            <Field name="language" type="select"
                :label="$t('Preferred language')"
                :model.sync="user.profile.language"
                :change="setLanguage"
                :options="[{id: 'en', name: 'English'}, {id: 'nl', name: 'Dutch'}]"/>

            <div class="field is-grouped margin-top-1">
                <p class="control">
                    <button class="button is-primary"
                        :disabled="$v.$invalid"
                        @click="upsertUser(user, $v)">
                        {{$t('Save changes')}}
                    </button>
                </p>
            </div>
        </Tab>

        <Tab v-show="clientId" :data="tabs[2]">

        </Tab>

        <Tab :data="tabs[3]">
            <Field name="session_expiry" type="checkbox"
                :label="$t('Log out after 10 minutes')"
                :model.sync="user.session_expiry"/>

            <Field name="groups" type="multiselect" :label="$t('Member of permission groups')"
                :help="$t('Select at least one group.')"
                :model.sync="user.groups"
                :options="groups"
                :placeholder="$t('Disable call permissions...')"/>

            <div class="field is-grouped margin-top-1">
                <p class="control">
                    <button class="button is-primary"
                        :disabled="$v.$invalid"
                        @click="upsertUser(user, $v)">
                        {{$t('Save changes')}}
                    </button>
                </p>
            </div>
        </Tab>
    </Tabs>
</div>
