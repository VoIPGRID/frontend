module.exports = (app) => {
    const template = app.templates.main_oops

    /**
     * @memberof module:partners
     * @namespace
     */
    return Vue.component('Oops', {
        computed: {},
        render: template.r,
        staticRenderFns: template.s,
    })
}
