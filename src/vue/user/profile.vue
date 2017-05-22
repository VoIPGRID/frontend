<div class="user-profile-component">
    <h2 class="subtitle">{{$t('Profile')}}</h2>
    <div class="field">
        <label class="label" for="name">{{$t('Language')}}</label>
        <div class="language-picker" @click="$store.dispatch('user/setLanguage', 'en')">{{$t('English')}}</div>
        <div class="language-picker" @click="$store.dispatch('user/setLanguage', 'nl')">{{$t('Dutch')}}</div>
    </div>
</div>
