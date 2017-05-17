<div>
    <notifications></notifications>
    <div v-if="$store.state.user.authenticated">
        <nav class="nav has-shadow">
            <div class="container">
                <div class="nav-left">
                    <a class="nav-item nav__logo">
                        <img src="/public/img/logo.png" alt="VoIPGRID logo">
                    </a>
                    <router-link class="nav-item is-tab is-hidden-mobile" to="/" exact>{{$t('Dashboard')}}</router-link>
                    <router-link class="nav-item is-tab is-hidden-mobile" to="/partners">{{$t('Partners')}}</router-link>
                    <router-link class="nav-item is-tab is-hidden-mobile" to="/clients">{{$t('Clients')}}</router-link>
                </div>

                <span class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                <div class="nav-right nav-menu">
                    <router-link class="nav-item is-tab is-hidden-tablet" to="/" exact>{{$t('Dashboard')}}</router-link>
                    <router-link class="nav-item is-tab is-hidden-tablet" to="/partners">{{$t('Partners')}}</router-link>
                    <router-link class="nav-item is-tab is-hidden-tablet" to="/clients">{{$t('Clients')}}</router-link>

                    <a class="nav-item is-tab">
                        <figure class="image is-16x16" style="margin-right: 8px;">
                        </figure>
                        {{$t('Profile')}}
                    </a>

                    <a v-if="$store.state.user.authenticated" class="nav-item is-tab" @click="$store.dispatch('user/logout')">{{$t('Logout')}}</a>
                    <router-link v-if="!$store.state.user.authenticated" class="nav-item is-tab" to="/login">{{$t('Login')}}</router-link>
                </div>
            </div>
        </nav>

        <div class="columns container main-container">
            <div class="column">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <div v-else>
        <UserLogin></UserLogin>
    </div>
</div>
