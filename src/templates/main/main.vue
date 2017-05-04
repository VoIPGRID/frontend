<div>
    <notifications></notifications>
    <nav class="nav has-shadow">
        <div class="container">
            <div class="nav-left">
                <a class="nav-item">
                    <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
                </a>
                <router-link class="nav-item is-tab is-hidden-mobile" to="/" exact>Home</router-link>
                <router-link class="nav-item is-tab is-hidden-mobile" to="/partners">Partners</router-link>
                <router-link class="nav-item is-tab is-hidden-mobile" to="/clients">Clients</router-link>
            </div>

            <span class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </span>

            <div class="nav-right nav-menu">
                <router-link class="nav-item is-tab is-hidden-tablet" to="/" exact>Home</router-link>
                <router-link class="nav-item is-tab is-hidden-tablet" to="/partners">Partners</router-link>
                <router-link class="nav-item is-tab is-hidden-tablet" to="/clients">Clients</router-link>
                <a class="nav-item is-tab" @click="$store.dispatch('notify', {message: 'lorum ewef qonmiwefnm qweoifnqweoifn oifn oimnef '})">
                    <figure class="image is-16x16" style="margin-right: 8px;">

                    </figure>
                    Profile
                </a>

                <a v-if="$store.state.main.authenticated" class="nav-item is-tab" @click="$store.dispatch('main/logout')">Logout</a>
                <router-link v-if="!$store.state.main.authenticated" class="nav-item is-tab" to="/login">Login</router-link>
            </div>
        </div>
    </nav>

    <div class="columns container main-container">
        <div class="column">
            <router-view></router-view>
        </div>
    </div>
</div>
