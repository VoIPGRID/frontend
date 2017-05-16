# Nginx
Run the `feature/frontend-rest-mock` branch of VoIPGRID on `0:8000`.
Setup Nginx as following:

    server {
        listen 80;
        server_name localhost;

        # Serve static files for VoIPGRID frontend V1.
        location /static/ {
            root /srv/http/data/static/;
            rewrite ^/static/[0-9a-f]+m?/(.*)$ /$1 break;
            gunzip on;
            gzip_comp_level 6;
            gzip_min_length  1100;
            gzip_buffers 16 8k;
            gzip_proxied any;
            gzip_types text/plain application/xml text/css text/js text/xml application/x-javascript text/javascript application/javascript application/json application/xml+rss;
            autoindex off;
        }

       # Serve VoIPGRID frontend V1 for all urls, except for
       # the ones we need for V2 or for V1 static files.
       location ~ ^/(?!v2|public|static/)(.*)$ {
           proxy_pass http://localhost:8000;
       }

       # Serve index.html for V2.
       location ~ ^/v2/(?!static|public/)(.*)$ {
           proxy_set_header Host $http_host;
           rewrite ^ /api/v2/index/ break;
           proxy_pass http://localhost:8000;
       }

       # Serve public files for V2.
       location /public/ {
           root /srv/http/data/frontend/;
           rewrite ^/public/(.*)$ /$1 break;
           gzip_static on;
       }
    }
