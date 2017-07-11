<div class="user-user.profile-component">

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

    <div class="field">
        <label class="label" for="name">{{$t('Language')}}</label>
        <div class="language-picker" @click="$store.dispatch('user/setLanguage', 'en')">{{$t('English')}}</div>
        <div class="language-picker" @click="$store.dispatch('user/setLanguage', 'nl')">{{$t('Dutch')}}</div>
    </div><br/>

    <div class="field is-grouped margin-top-1">
        <p class="control">
            <button class="button is-primary"
                :disabled="!formIsValid"
                @click="$store.dispatch('user/updateProfile', $v)">
                {{$t('Save changes')}}
            </button>
        </p>
    </div>
</div>
