<Tabs :tabs=tabs class="content-page">

    <template slot="tablist">
        <i class="fa fa-user"></i>
        <span>{{fullName}}</span>
    </template>

    <Tab slot="tabs" :data="tabs[0]">
        <h4>{{$t('Personal')}}</h4>

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
    </Tab>

    <Tab slot="tabs" :data="tabs[1]">
        <h4>{{$t('Interface settings')}}</h4>
        <Field name="language" type="select"
            :label="$t('Preferred language')"
            :model.sync="user.profile.language"
            :change="setLanguage"
            :options="[{id: 'en', name: 'English'}, {id: 'nl', name: 'Dutch'}]"/>
    </Tab>

    <Tab slot="tabs" v-show="clientId" :data="tabs[2]">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>{{$t('Selected')}}</th>
                    <th>{{$t('Destination')}}</th>
                    <th>{{$t('Type')}}</th>
                    <th class="col-sm-2">{{$t('Actions')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input type="radio" name="selected_destination">
                    </td>
                    <td colspan="3">{{$t('Do not disturb')}}</td>
                </tr>
                <tr v-for="ud in userdestinations">
                    <td>
                        <input type="radio" name="selected_destination">
                    </td>
                    <td>
                        {{ud.internal_number}}
                        {{ud.description}}
                    </td>
                    <td v-if="ud.internal_number">
                        VoIP account
                    </td>
                    <td v-else>
                        Fixed Destination
                    </td>
                    <td class="table-actions">

                    </td>
                </tr>
            </tbody>
        </table>
    </Tab>

    <Tab slot="tabs" :data="tabs[3]">
        <h4>{{$t('Password')}}</h4>

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
        <Field name="session_expiry" type="checkbox"
            :label="$t('Log out after 10 minutes')"
            :model.sync="user.session_expiry"/>
        <hr/>

        <h4>{{$t('Permissions')}}</h4>
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
