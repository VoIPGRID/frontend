<nav class="breadcrumbs">
    <span v-if="user.selectedClient.id">
        {{user.selectedClient.name}}
    </span>
    <span v-else-if="user.selectedPartner.id">
        {{user.selectedPartner.name}}
    </span>
    <span v-for="crumb in breadcrumbs">
        {{crumb}}
    </span>
</nav>
