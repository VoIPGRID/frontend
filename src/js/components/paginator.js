/**
 * Vue component for pagination that works well with DRF's default
 * pagination style.
 * @param {Object} template - The template to use with this component.
 * @returns {Object} - The Vue component attributes.
 * @class
 */
function Paginator(template) {

    /**
     * The default component context.
     * @returns {Object} - Properties of the paginator component.
     */
    let data = function() {
        return {
            currentPage: 1,
            pageSize: 10,
            navPages: [],
            showNavPages: 7,
            lastPage: 1,
        }
    }


    /**
     * Fetches a resource based on a page query string or a page number.
     * @param {String|Number} context - An url to the next page or page number.
     * @param {Boolean} pushRoute - Modifies navigator history when true.
     */
    async function fetchData(context, pushRoute = true) {
        if (!context) return
        let currentPage
        if (typeof context === 'string') {
            let _uri = context.split('?')
            if (_uri.length === 2) {
                currentPage = parseInt(app.utils.parseSearch(_uri[1]).page)
            } else {
                currentPage = 1
            }
        } else {
            currentPage = context
        }
        let _data = await this.$store.dispatch(this.resource_action, {
            resource_url: this.resource_url,
            params: {
                page: currentPage,
            },
        })

        if (pushRoute) {
            const route = this.$router.resolve(this.resource_url).route
            this.$router.push({ name: route.name, query: { page: currentPage }})
        }

        this.updatePagination(currentPage, _data)
    }


    /**
     * Update the pagination component state.
     * @param {Number} currentPage - Used to determine the next page.
     * @param {Object} context - Context to update the pagination with.
     * @param {String} context.count - Total amount of items.
     * @param {String} context.pageSize - Items per page.
     */
    function updatePagination(currentPage, context) {
        let pageCount = Math.ceil(context.count / this.pageSize)
        let _navPages = []
        const middleNav = Math.floor(this.showNavPages / 2)
        const isTippingPoint = currentPage > middleNav
        const pagesInNavRange = pageCount < this.showNavPages
        // Tipping point where to account for in-between.
        if (isTippingPoint && !pagesInNavRange) {
            // Render halve of the pages before currentPage.
            for (let i = currentPage - middleNav; i < currentPage; i++) {
                if (i > 0) {
                    _navPages.push(i)
                }
            }
            // And the other halve after currentPage.
            for (let i = currentPage; i <= currentPage + middleNav; i++) {
                if (i > 0 && i <= pageCount) {
                    _navPages.push(i)
                }
            }
        } else {
            // Just render until pageCount or showNavPages max.
            let _r
            if (pageCount > this.showNavPages) {
                _r = this.showNavPages
            } else {
                _r = pageCount
            }
            for (let i = 1; i <= _r; i++) {
                _navPages.push(i)
            }
        }

        // Add a link to the first page when it's out of scope.
        if (_navPages[0] !== 1) {
            this.backwardFirst = 1
        } else {
            this.backwardFirst = null
        }
        // Add a link the the last page when it's out of scope.
        if (_navPages[_navPages.length - 1] !== pageCount) {
            this.forwardLast = pageCount
        } else {
            this.forwardLast = null
        }

        this.currentPage = currentPage

        if (pageCount !== this.pageCount) {
            this.pageCount = pageCount
        }

        this.navPages = _navPages
    }


    return {
        render: template.r,
        staticRenderFns: template.s,
        props: ['count', 'next', 'previous', 'resource_action', 'resource_url'],
        data: data,
        methods: {
            fetchData: fetchData,
            updatePagination: updatePagination,
        },
        created: function() {
            this.route = this.$router.resolve(location.href).route
            const page = parseInt(this.route.query.page) || 1
            this.fetchData(page, false)
        },
    }
}

module.exports = Paginator
