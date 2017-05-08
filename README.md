# About
The VoIPGRID frontend webapp is single-page and talks to VoIPGRID API V2 using
REST. It's build on top of Vue.js, Vue-router and Vuex. The key characteristics of the webapp should be:
* Light-weight (~100kb Javascript)
* DOM-agnostic where possible (SSR & testing)
* Well-documented (Jsdoc)

# Install & develop
    git clone git@github.com:VoIPGRID/voipgrid-frontend.git
    cd voipgrid-frontend
    npm i
    gulp build
    gulp watch

# Nginx config
Run the `feature/frontend-rest-mock` branch of VoIPGRID on `0:8000`.
Setup Nginx as following:

    server {
        listen 80;
        server_name localhost;

        location /api/v2/ {
            proxy_set_header Host $http_host;
            proxy_pass http://127.0.0.1:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location ~ ^/(?!api|static/)(.*)$ {
            root /srv/http/data/frontend/;
            gzip_static on;
            try_files $uri /index.html;
        }
    }
