<nav class="breadcrumbs">
    <ul>
        BREAD: {{breadcrumbs}}
        <li v-for="crumb in breadcrumbs">
            {{$t(crumb)}}
        </li>
    </ul>
</nav>
