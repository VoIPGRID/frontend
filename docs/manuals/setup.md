# Nginx
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
