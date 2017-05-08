<nav class="pagination">
    <a class="pagination-previous" :disabled="!previous" @click=fetchData(previous)>Previous</a>
    <a class="pagination-next" :disabled="!next" @click=fetchData(next)>Next page</a>
    <ul class="pagination-list">
        <li v-for="(n, index) in navPages">
            <a class="pagination-link"
                @click=fetchData(n)
                :class="{'is-current': n === currentPage}">
            {{ n }}
        </a>
        </li>
    </ul>
</nav>
