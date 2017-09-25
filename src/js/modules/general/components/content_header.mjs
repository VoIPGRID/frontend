export function ContentHeader(app, actions) {
    const template = app.templates.general_content_header

    return {
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'user',
        },
    }
}
