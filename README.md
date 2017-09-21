# About
This is the VoIPGRID webapp prototype built with Vue. It's focussed around
these key concepts:
* Light-weight
* Fast build flow
* DOM-agnostic (SSR & testing)
* Well documented

# Install
The proprietary VoIPGRID portal is a requirement for this prototype to work.
Install [VoIPGRID](https://ci.wearespindle.com/job/voipgrid-docs/docs/manuals/install.html) first.
Then proceed with:

    cd ~/projects/voipgrid-env/voipgrid
    git checkout feature/frontend-rest-mock
    git submodule update
    cd frontend
    git checkout prototype-vue
    npm i
    gulp build
    gulp watch

Checkout the {@tutorial setup} for more information about how to configure Nginx.
