<nav class="nav-main">
    <a class="logo">
        <img src="/public/img/logo.png" alt="VoIPGRID logo">
    </a>

    <div class="nav-item-wrapper context-selector">
        <router-link class="nav-item" v-if="user.selectedClient.id" :to="{name: 'dashboard_home', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
            <i class="level-up item-icon fa fa-level-up fa-flip-horizontal" @click="deselectClient"></i>
            <i class="item-icon fa fa-group"></i>
            <span class="item-text">{{user.selectedClient.name}}</span>
        </router-link>
        <router-link class="nav-item" v-else-if="user.selectedPartner.id" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}">
            <i class="level-up fa fa-level-up fa-flip-horizontal" @click="deselectPartner"></i>
            <i class="fa fa-handshake-o"></i>
            <span>{{user.selectedPartner.name}}</span>
        </router-link>
        <router-link class="nav-item" v-else-if="user.superuser || (user.partner && user.partner.may_have_children)" to="/partners">
            <i class="fa fa-handshake-o"></i>
            <span>{{$t('Partners')}}</span>
        </router-link>
    </div>

    <div class="nav-item-wrapper" v-if="user.selectedPartner.id && !user.selectedClient.id">
        <router-link class="nav-item" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}" exact>
            <i class="fa fa-group"></i>
            <span>{{$t('Clients')}}</span>
        </router-link>

        <router-link class="nav-item disabled" :to="{name: 'dashboard_home', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}" exact>
            <i class="fa vg-icon vg-icon-ivr"></i>
            <span>{{$t('Dashboard')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/statistics" exact>
            <i class="fa fa-signal"></i>
            <span>{{$t('Statistics')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/administration" exact>
            <i class="fa fa-money"></i>
            <span>{{$t('Administration')}}</span>
        </router-link>

        <router-link class="nav-item" :to="{name: 'list_partner_users', params: {partner_id: user.selectedPartner.id}}">
            <i class="fa fa-address-book"></i>
            <span>{{$t('Users')}}</span>
        </router-link>

    </div>

    <div class="nav-item-wrapper" v-else-if="user.selectedClient.id">
        <router-link class="nav-item disabled" :to="{name: 'dashboard_home', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}" exact>
            <i class="fa vg-icon vg-icon-ivr"></i>
            <span>{{$t('Dashboard')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/statistics" exact>
            <i class="fa fa-signal"></i>
            <span>{{$t('Statistics')}}</span>
        </router-link>

        <router-link class="nav-item" :to="{name: 'list_client_users', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}">
            <i class="fa fa-address-book"></i>
            <span>{{$t('Users')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/dialplan" exact>
            <i class="fa fa-retweet"></i>
            <span>{{$t('Dialplan')}}</span>
        </router-link>

        <router-link class="nav-item" :to="{name: 'modules', params: {partner_id: user.selectedPartner.id, client_id: user.selectedClient.id}}" exact>
            <i class="fa vg-icon vg-icon-ivr"></i>
            <span>{{$t('Modules')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/calls" exact>
            <i class="fa fa-comments"></i>
            <span>{{$t('Calls')}}</span>
        </router-link>

        <router-link class="nav-item disabled" to="/administration" exact>
            <i class="fa fa-money"></i>
            <span>{{$t('Administration')}}</span>
        </router-link>
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
