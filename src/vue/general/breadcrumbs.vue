<nav class="breadcrumbs">
    <ul >
        <li v-if="user.selectedClient.id">
            {{user.selectedClient.name}}
        </li>
        <li v-else-if="user.selectedPartner.id">
            {{user.selectedPartner.name}}
        </li>
        <li v-for="crumb in breadcrumbs">
            {{crumb}}
        </li>
    </ul>
</nav>
