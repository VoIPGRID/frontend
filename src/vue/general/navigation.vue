<nav class="nav-main">
    <a class="logo">
        <img src="/public/img/logo.png" alt="VoIPGRID logo">
    </a>

    <div class="nav-item-wrapper context-selector">
        <span class="nav-item" v-if="user.selectedClient.id">
            <router-link :to="{name: 'dashboard_client', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
                <i class="item-icon fa fa-group"></i>
                <span class="item-text">{{user.selectedClient.name}}</span>
            </router-link>
            <router-link class="level-up" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}">
                <i class="item-icon fa fa-level-up fa-flip-horizontal"></i>
            </router-link>
        </span>
        <span class="nav-item" v-else-if="user.selectedPartner.id">
            <router-link :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}">
                <i class="fa fa-handshake-o"></i>
                <span>{{user.selectedPartner.name}}</span>
            </router-link>
            <router-link class="level-up" :to="{name: 'list_partners'}">
                <i class="item-icon fa fa-level-up fa-flip-horizontal"></i>
            </router-link>
        </span>
        <span class="nav-item" v-else-if="user.superuser || (user.partner && user.partner.may_have_children)">
            <router-link to="/partners">
                <i class="item-icon fa fa-handshake-o"></i>
                <span>{{$t('Select partner')}}</span>
            </router-link>
            <router-link class="level-up" :to="{name: 'list_partners'}">
                <i class="item-icon fa-flip-horizontal"></i>
            </router-link>
        </span>
    </div>

    <div class="nav-item-wrapper" v-if="user.selectedPartner.id && !user.selectedClient.id">
        <router-link class="nav-item" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}" exact>
            <i class="fa fa-group"></i>
            <span>{{$t('Clients')}}</span>
        </router-link>

        <router-link class="nav-item" :to="{name: 'dashboard_partner', params: {partner_id: user.selectedPartner.id}}" exact>
            <i class="fa vg-icon vg-icon-ivr"></i>
            <span>{{$t('Dashboard')}}</span>
        </router-link>

        <a class="nav-item disabled">
            <i class="fa fa-signal"></i>
            <span>{{$t('Statistics')}}</span>
        </a>

        <router-link class="nav-item" :to="{name: 'list_partner_users', params: {partner_id: user.selectedPartner.id}}">
            <i class="fa fa-address-book"></i>
            <span>{{$t('Users')}}</span>
        </router-link>

        <a class="nav-item disabled">
            <i class="fa fa-money"></i>
            <span>{{$t('Administration')}}</span>
        </a>

    </div>

    <div class="nav-item-wrapper" v-else-if="user.selectedClient.id">
        <router-link class="nav-item" :to="{name: 'dashboard_client', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}" exact>
            <i class="fa vg-icon vg-icon-ivr"></i>
            <span>{{$t('Dashboard')}}</span>
        </router-link>

        <a class="nav-item disabled">
            <i class="fa fa-signal"></i>
            <span>{{$t('Statistics')}}</span>
        </a>

        <router-link class="nav-item" :to="{name: 'list_client_users', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
            <i class="fa fa-address-book"></i>
            <span>{{$t('Users')}}</span>
        </router-link>

        <a class="nav-item disabled" to="/dialplan">
            <i class="fa fa-retweet"></i>
            <span>{{$t('Dialplan')}}</span>
        </a>

        <router-link class="nav-item" :to="{name: 'modules', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}" exact>
            <i class="fa vg-icon vg-icon-ivr"></i>
            <span>{{$t('Modules')}}</span>
        </router-link>

        <a class="nav-item disabled" to="/calls">
            <i class="fa fa-comments"></i>
            <span>{{$t('Calls')}}</span>
        </a>

        <a class="nav-item disabled">
            <i class="fa fa-money"></i>
            <span>{{$t('Administration')}}</span>
        </a>
    </div>


    <div class="nav-item-wrapper pull-down">
        <router-link class="nav-item disabled" to="/wiki" exact>
            <i class="fa fa-question-circle"></i>
            <span>{{$t('Wiki')}}</span>
        </router-link>

        <a v-if="user.authenticated" class="nav-item" @click="logout">
            <i class="fa fa-sign-out"></i>
            <span>{{$t('Logout')}}</span>
        </a>
    </div>
</nav>
