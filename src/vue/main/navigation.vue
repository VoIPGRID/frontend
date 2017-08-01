<nav class="nav-main">
    <a class="logo">
        <img src="/public/img/logo.png" alt="VoIPGRID logo">
    </a>

    <ul class="context-selector">
        <li>
            <router-link v-if="user.selectedPartner" to="/partners">
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
            <router-link v-if="user.selectedClient" to="/clients">
                <i class="item-level-up item-icon fa fa-level-up" @click="deselectClient"></i>
                <i class="item-icon fa fa-group"></i>
                <span class="item-text">{{user.selectedClient.name}}</span>
            </router-link>
            <router-link v-else-if="user.selectedPartner" to="/clients">
                <i class="item-icon fa fa-group"></i>
                <span class="item-text">{{$t('Clients')}}</span>
            </router-link>
        </li>
    </ul>

    <ul>
        <li v-if="user.selectedClient">
            <router-link to="/" exact>
                <i class="item-icon fa fa-pie-chart"></i>
                <span class="item-text">{{$t('Dashboard')}}</span>
            </router-link>
        </li>

        <li v-if="user.selectedClient">
            <router-link to="/statistics" exact>
                <i class="item-icon fa fa-area-chart"></i>
                <span class="item-text">{{$t('Statistics')}}</span>
            </router-link>
        </li>

        <li v-if="user.selectedClient">
            <router-link to="/administration" exact>
                <i class="item-icon fa fa-reorder"></i>
                <span class="item-text">{{$t('Administration')}}</span>
            </router-link>
        </li>

    </ul>
</nav>
