<div class="content user-user.profile-component">

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
        :model.sync="user.profile.last_name"/>

    <h2 class="title">{{$t('Password')}}</h2><hr/>

    <Field name="old_password" type="password"
        :label="$t('Old password')"
        :model.sync="user.old_password"
        :validation="$v.user.old_password"/>

    <Field name="password" type="password"
        :help="$t('Password should have at least 6 characters and 1 non-alphabetical character.')"
        :label="$t('New password')"
        :model.sync="user.password"
        :validation="$v.user.password"/>

    <Field name="password_confirm" type="password"
        :label="$t('New password confirmation')"
        :model.sync="user.password_confirm"
        :validation="$v.user.password_confirm"/>

    <h2 class="title">{{$t('Preferences')}}</h2><hr/>

    <Field name="language" type="select"
        :label="$t('Preferred language')"
        :model.sync="user.profile.language"
        :change="setLanguage"
        :options="[{id: 'en', name: 'English'}, {id: 'nl', name: 'Dutch'}]"/>

    <div class="field is-grouped margin-top-1">
        <p class="control">
            <button class="button is-primary"
                :disabled="!formIsValid"
                @click="updateProfile(user, $v)">
                {{$t('Save changes')}}
            </button>
        </p>
    </div>
</div>
