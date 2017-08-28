<Tabs :tabs=tabs>
    <template slot="tablist">
        <i class="fa fa-user"></i>
        <span>{{fullName}}</span>
    </template>

    <Tab slot="tabs" :data="tabs[0]">
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
    </Tab>

    <Tab slot="tabs" :data="tabs[1]">
        <Field name="language" type="select"
            :label="$t('Preferred language')"
            :model.sync="user.profile.language"
            :change="setLanguage"
            :options="[{id: 'en', name: 'English'}, {id: 'nl', name: 'Dutch'}]"/>
    </Tab>

    <Tab slot="tabs" v-show="clientId" :data="tabs[2]">
        <Field name="fixeddestinations" type="select"
            :label="$t('Fixed/mobile number')"
            :model.sync="fixeddestinations"
            :validation="$v.fixeddestinations"/>
    </Tab>

    <Tab slot="tabs" :data="tabs[3]">
        <Field name="session_expiry" type="checkbox"
            :label="$t('Log out after 10 minutes')"
            :model.sync="user.session_expiry"/>

        <Field name="groups" type="multiselect" :label="$t('Member of permission groups')"
            :help="$t('Select at least one group.')"
            :model.sync="user.groups"
            :options="groups"
            :placeholder="$t('Disable call permissions...')"/>
    </Tab>

    <template slot="controls">
        <p class="control">
            <button class="button is-primary"
                :disabled="$v.$invalid"
                @click="upsertUser(user, $v)">
                {{$t('Save changes')}}
            </button>
        </p>
    </template>
</Tabs>
