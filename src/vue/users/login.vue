<div class="user-login-component modal is-active" tabindex="-1" v-on:keyup.enter="login(root, credentials)">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <img class="login-header-logo" src="/public/img/logo.png" alt="VoIPGRID logo">
        </header>
        <section class="modal-card-body">
            <div>
                <Field name="email" type="text"
                    :label="$t('Email address')"
                    :model.sync="credentials.email"
                    :placeholder="$t('Email address')"
                    :validation="$v.credentials.email"/>

                <Field name="password" type="password"
                    :label="$t('Password')"
                    :model.sync="credentials.password"
                    :placeholder="$t('Password')"
                    :validation="$v.credentials.password"/>
            </div>
        </section>
        <footer class="modal-card-foot has-text-right">
            <button class="is-pulled-right button is-primary"
                v-on:click="login(credentials, credentials)"
                :disabled="$v.$invalid"
            >Login</button>
        </footer>
    </div>
</div>
