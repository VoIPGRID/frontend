<nav class="nav-main">
    <a class="logo">
        <img src="/public/img/logo.png" alt="VoIPGRID logo">
    </a>

    <div class="context-selector nav-item-container">
        <router-link class="nav-item" v-if="user.selectedPartner.id" :to="{name: 'list_partners', params: {partner_id: user.selectedPartner.id}}" exact>
            <i class="level-up fa fa-level-up" @click="deselectPartner"></i>
            <i class="fa fa-handshake-o"></i>
            <span>{{user.selectedPartner.name}}</span>
        </router-link>
        <router-link class="nav-item" v-else-if="user.superuser || (user.partner && user.partner.may_have_children)" to="/partners">
            <i class="fa fa-handshake-o"></i>
            <span>{{$t('Partners')}}</span>
        </router-link>
    </div>

    <div class="nav-item-container" v-if="user.selectedPartner.id && !user.selectedClient.id">
        <router-link class="nav-item" :to="{name: 'list_partner_users', params: {partner_id: user.selectedPartner.id}}">
            <i class="fa fa-address-book"></i>
            <span>{{$t('Users')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/" exact>
            <i class="fa fa-comments"></i>
            <span>{{$t('Calls')}}</span>
        </router-link>
    </div>

    <div class="nav-item-container" v-else-if="user.selectedClient.id">
        <router-link class="nav-item disabled" to="/administration" exact>
            <i class="fa fa-money"></i>
            <span>{{$t('Administration')}}</span>
        </router-link>

        <router-link class="nav-item" :to="{name: 'list_phoneaccounts', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
            <i class="fa fa-phone"></i>
            <span>{{$t('VoIP accounts')}}</span>
        </router-link>

        <router-link class="nav-item" :to="{name: 'list_client_users', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
            <i class="fa fa-address-book"></i>
            <span>{{$t('Users')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/calls" exact>
            <i class="fa fa-comments"></i>
            <span>{{$t('Calls')}}</span>
        </router-link>

        <router-link class="nav-item" :to="{name: 'dashboard_home', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}" exact>
            <i class="fa vg-icon vg-icon-ivr"></i>
            <span>{{$t('Dashboard')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/dialplan" exact>
            <i class="fa fa-retweet"></i>
            <span>{{$t('Dialplan')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/statistics" exact>
            <i class="fa fa-signal"></i>
            <span>{{$t('Statistics')}}</span>
        </router-link>
    </div>
</nav>
