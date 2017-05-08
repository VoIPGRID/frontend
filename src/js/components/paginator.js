module.exports = (function() {
    const template = templates.components_paginator
    return {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        props: ['count', 'next', 'previous', 'resource_action', 'resource_url'],
        data: function() {
            return {
                currentPage: 1,
                pageSize: 10,
                navPages: [],
                showNavPages: 7,
                lastPage: 1,
            }
        },
        methods: {
            /**
             * Fetches a resource based on a page query string or a page number.
             */
            async fetchData(data, pushRoute = true) {
                if (!data) return
                let currentPage
                if (typeof data === 'string') {
                    let _uri = data.split('?')
                    if (_uri.length === 2) {
                        currentPage = parseInt(app.utils.parseParams(_uri[1]).page)
                    } else {
                        currentPage = 1
                    }
                } else {
                    currentPage = data
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

                this.currentPage = currentPage
                let pageCount = Math.ceil(_data.count / this.pageSize)
                if (pageCount !== this.pageCount) {
                    this.pageCount = pageCount
                }
                this.updateNavPages()
            },
            updateNavPages() {
                let start = this.currentPage
                let _navPages = []

                if (this.currentPage > Math.floor(this.showNavPages / 2)) {
                    // Render two pages before currentPage.
                    let range = Math.floor(this.showNavPages / 2)

                    for (let i = start - range; i < start; i++) {
                        if (i > 0) {
                            _navPages.push(i)
                        }
                    }
                    for (let i = start; i <= start + range; i++) {
                        if (i > 0 && i <= this.pageCount) {
                            _navPages.push(i)
                        }
                    }
                } else {
                    for (let i = 1; i <= this.showNavPages; i++) {
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
                if (_navPages[_navPages.length - 1] !== this.pageCount) {
                    this.forwardLast = this.pageCount
                } else {
                    this.forwardLast = null
                }

                this.navPages = _navPages
            },
        },
        created: function() {
            this.route = this.$router.resolve(location.href).route
            const page = parseInt(this.route.query.page) || 1
            this.fetchData(page, false)
        },
    }
})()
