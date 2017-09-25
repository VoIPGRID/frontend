export function Breadcrumbs(app, actions) {
    const template = app.templates.general_breadcrumbs

    return {
        filters: {
            // Display the correct breadcrumb text
            // depending on the Vue version
            crumbText: function(crumb) {
                return crumb.meta.breadcrumb
            },
        },
        methods: {
            // Return the correct prop data
            linkProp: function(crumb) {
                // If it's a named route, we'll base the route
                // off of that instead
                if (crumb.name || (crumb.handler && crumb.handler.name)) {
                    return {
                        name: crumb.name || crumb.handler.name,
                        params: this.$route.params,
                    }
                }

                return {
                    params: this.$route.params,
                    path: (crumb.handler && crumb.handler.fullPath) ? crumb.handler.fullPath : crumb.path,
                }
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            breadcrumbs: 'breadcrumbs',
            user: 'user',
        },
    }
}
