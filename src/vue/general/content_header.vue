<nav class="navbar content-header">

    <router-link v-if="user.client" class="nav-item"
        :to="{name: 'edit_client_user', params: {client_id: user.client.id, user_id: user.id}}">
        <i class="fa fa-user-circle"></i>
    </router-link>
    <router-link v-else class="nav-item"
    :to="{name: 'edit_partner_user', params: {partner_id: user.partner.id, user_id: user.id}}">
        <i class="fa fa-user-circle"></i>
    </router-link>

    <router-link v-if="user.client" class="nav-item"
    :to="{name: 'edit_client', params: {client_id: user.client.id}}">
        <i class="fa fa-cog"></i>
    </router-link>
    <router-link v-else class="nav-item"
    :to="{name: 'edit_partner', params: {partner_id: user.partner.id}}">
        <i class="fa fa-cog"></i>
    </router-link>

    <router-link class="nav-item" to="/">
        <i class="fa fa-question-circle"></i>
    </router-link>
</nav>
