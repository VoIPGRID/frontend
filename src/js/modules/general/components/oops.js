module.exports = (app) => {
    const template = app.templates.general_oops

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
