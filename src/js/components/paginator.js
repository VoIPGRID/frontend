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
            async fetchData(data) {
                if (!data) return
                if (typeof data === 'string') {
                    let _uri = data.split('?')
                    if (_uri.length === 2) {
                        this.currentPage = parseInt(app.utils.parseParams(_uri[1]).page)
                    } else {
                        this.currentPage = 1
                    }
                } else {
                    this.currentPage = data
                }
                this.updateNavPages()
                let _data = await this.$store.dispatch(this.resource_action, {
                    resource_url: this.resource_url,
                    params: {
                        page: this.currentPage,
                    },
                })
                let pageCount = Math.ceil(_data.count / this.pageSize)
                if (pageCount !== this.pageCount) {
                    this.pageCount = pageCount
                }

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
                this.navPages = _navPages
            },
        },
        created: function() {
            this.fetchData(1)
        },
    }
})()
