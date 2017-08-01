<nav class="navbar nav-content">
    <div class="nav-right">
        <router-link class="nav-item is-tab" to="/wiki">
            <i class="fa fa-question-circle"></i>
        </router-link>
        <router-link class="nav-item is-tab" to="/profile">
            <i class="fa fa-user-circle"></i>
        </router-link>
        <a v-if="user.authenticated" class="nav-item is-tab" @click="logout">
            <i class="fa fa-sign-out"></i>
        </a>
        <router-link v-if="!user.authenticated" class="nav-item is-tab" to="/login">{{$t('Login')}}</router-link>
    </div>
</nav>
