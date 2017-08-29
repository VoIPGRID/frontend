<nav class="nav-main">
    <a class="logo">
        <img src="/public/img/logo.png" alt="VoIPGRID logo">
    </a>

    <ul class="context-selector">
        <li>
            <router-link v-if="user.selectedPartner.id" :to="{name: 'list_partners', params: {partner_id: user.selectedPartner.id}}" exact>
                <i class="item-level-up item-icon fa fa-level-up" @click="deselectPartner"></i>
                <i class="item-icon fa fa-handshake-o"></i>
                <span class="item-text">{{user.selectedPartner.name}}</span>
            </router-link>
            <router-link v-else-if="user.superuser || (user.partner && user.partner.may_have_children)" to="/partners">
                <i class="item-icon fa fa-handshake-o"></i>
                <span class="item-text">{{$t('Partners')}}</span>
            </router-link>
        </li>

        <li>
            <router-link v-if="user.selectedClient.id" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}" exact>
                <i class="item-level-up item-icon fa fa-level-up" @click="deselectClient"></i>
                <i class="item-icon fa fa-group"></i>
                <span class="item-text">{{user.selectedClient.name}}</span>
            </router-link>

            <router-link v-else-if="user.selectedPartner.id" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}">
                <i class="item-icon fa fa-group"></i>
                <span class="item-text">{{$t('Clients')}}</span>
            </router-link>
        </li>
    </ul>

    <ul v-if="user.selectedPartner.id && !user.selectedClient.id">
        <li>
            <router-link :to="{name: 'list_partner_users', params: {partner_id: user.selectedPartner.id}}">
                <i class="item-icon fa fa-address-book"></i>
                <span class="item-text">{{$t('Users')}}</span>
            </router-link>
        </li>

        <li class="disabled">
            <router-link to="/" exact>
                <i class="item-icon fa fa-comments"></i>
                <span class="item-text">{{$t('Calls')}}</span>
            </router-link>
        </li>

    </ul>
    <ul v-else-if="user.selectedClient.id">
        <li class="disabled">
            <router-link to="/administration" exact>
                <i class="item-icon fa fa-money"></i>
                <span class="item-text">{{$t('Administration')}}</span>
            </router-link>
        </li>

        <li>
            <router-link :to="{name: 'list_phoneaccounts', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
                <i class="item-icon fa fa-phone"></i>
                <span class="item-text">{{$t('VoIP accounts')}}</span>
            </router-link>
        </li>

        <li>
            <router-link :to="{name: 'list_client_users', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
                <i class="item-icon fa fa-address-book"></i>
                <span class="item-text">{{$t('Users')}}</span>
            </router-link>
        </li>

        <li class="disabled">
            <router-link to="/calls" exact>
                <i class="item-icon fa fa-comments"></i>
                <span class="item-text">{{$t('Calls')}}</span>
            </router-link>
        </li>

        <li>
            <router-link :to="{name: 'dashboard_home', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}" exact>
                <i class="item-icon fa vg-icon vg-icon-ivr"></i>
                <span class="item-text">{{$t('Dashboard')}}</span>
            </router-link>
        </li>

        <li class="disabled">
            <router-link to="/dialplan" exact>
                <i class="item-icon fa fa-retweet"></i>
                <span class="item-text">{{$t('Dialplan')}}</span>
            </router-link>
        </li>

        <li class="disabled">
            <router-link to="/statistics" exact>
                <i class="item-icon fa fa-signal"></i>
                <span class="item-text">{{$t('Statistics')}}</span>
            </router-link>
        </li>
    </ul>
</nav>
