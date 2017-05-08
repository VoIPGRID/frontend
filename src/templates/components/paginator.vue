<nav class="pagination">
    <a class="pagination-previous" :disabled="!previous" @click=fetchData(previous)>Previous</a>
    <a class="pagination-next" :disabled="!next" @click=fetchData(next)>Next page</a>
    <ul class="pagination-list">
        <template v-if=backwardFirst>
            <li @click=fetchData(backwardFirst)>
                <a class="pagination-link">{{backwardFirst}}</a>
            </li>
            <li class="pagination-ellipsis">...</li>
        </template>
        <li v-for="(n, index) in navPages">
            <a class="pagination-link"
                @click=fetchData(n)
                :class="{'is-current': n === currentPage}">
            {{ n }}
            </a>
        </li>
        <template v-if=forwardLast>
        <li class="pagination-ellipsis">...</li>
        <li @click=fetchData(forwardLast)>
            <a class="pagination-link">{{forwardLast}}</a>
        </li>
        </template>
    </ul>
</nav>
