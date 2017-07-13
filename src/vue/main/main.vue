<div class="container-app" v-if="user.authenticated">
    <Shouts :shouts="shouts"></Shouts>
    <nav class="main-nav nav has-shadow">
        <div class="container">
            <div class="nav-left">
                <a class="nav-item nav__logo">
                    <img src="/public/img/logo.png" alt="VoIPGRID logo">
                </a>

                <router-link class="nav-item is-tab is-hidden-mobile" to="/" exact>{{$t('Dashboard')}}</router-link>
                <router-link v-if="user.superuser || (user.partner && user.partner.may_have_children)"
                    class="nav-item is-tab is-hidden-mobile" to="/partners">{{$t('Partners')}}
                </router-link>

                <router-link v-if="user.partner" class="nav-item is-tab is-hidden-mobile" to="/clients">{{$t('Clients')}}</router-link>
            </div>

            <span class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </span>

            <div class="nav-right nav-menu">
                <router-link class="nav-item is-tab is-hidden-tablet" to="/" exact>{{$t('Dashboard')}}</router-link>

                <router-link v-if="user.superuser || (user.partner && user.partner.may_have_children)"
                    class="nav-item is-tab is-hidden-tablet" to="/partners">{{$t('Partners')}}
                </router-link>

                <router-link v-if="user.partner" class="nav-item is-tab is-hidden-tablet" to="/clients">{{$t('Clients')}}</router-link>
                <router-link class="nav-item profile is-tab" to="/profile"><i class="fa fa-user-circle"></i>{{$t('Profile')}}</router-link>
                <a v-if="user.authenticated" class="nav-item is-tab" @click="$store.dispatch('user/logout')">{{$t('Logout')}}</a>
                <router-link v-if="!user.authenticated" class="nav-item is-tab" to="/login">{{$t('Login')}}</router-link>
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
