<div class="modal is-active login-component">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <img class="login-header-logo" src="/public/img/logo.png" alt="VoIPGRID logo">
        </header>
        <section class="modal-card-body">
            <div class="content">
                <div class="field">
                    <label class="label">{{$t('Email address')}}</label>
                    <p class="control has-icons-left">
                        <input class="input" v-model="credentials.email" :placeholder="$t('Email address')">
                        <span class="icon is-small is-left">
                            <i class="fa fa-user"></i>
                        </span>
                     </p>
                </div>

                <div class="field">
                    <label class="label">{{$t('Password')}}</label>
                    <p class="control has-icons-left">
                        <input type="password" class="input" v-model="credentials.password" :placeholder="$t('Password')">
                        <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                        </span>
                     </p>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot has-text-right">
            <button class="is-pulled-right button is-primary" @click="$store.dispatch('main/login')">Login</button>
        </footer>
    </div>
</div>
