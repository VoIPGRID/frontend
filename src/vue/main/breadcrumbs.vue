<nav class="breadcrumbs">
    <ul>
        <router-link v-if="user.selectedClient.id" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}" exact>
            <i class="item-level-up item-icon fa fa-level-up" @click="deselectClient"></i>
            <i class="item-icon fa fa-group"></i>
            <span class="item-text">{{user.selectedClient.name}}</span>
        </router-link>

        <router-link v-else-if="user.selectedPartner.id" :to="{name: 'list_clients', params: {partner_id: user.selectedPartner.id}}">
            <i class="item-icon fa fa-group"></i>
            <span class="item-text">{{$t('Clients')}}</span>
        </router-link>


        <li v-for="crumb in breadcrumbs">
            {{$t(crumb)}}
        </li>
    </ul>
</nav>
