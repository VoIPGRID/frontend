<nav class="breadcrumbs">
    <ul>
        <li v-if="user.selectedPartner.id">
            {{user.selectedPartner.name}}
        </li>
        <li v-if="user.selectedClient.id">
            {{user.selectedClient.name}}
        </li>
        <li v-for="crumb in breadcrumbs">
            {{$t(crumb)}}
        </li>
    </ul>
</nav>
