FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos HTML a la ubicación predeterminada de Nginx
COPY ./html /usr/share/nginx/html

# Copiar los archivos CSS a la ruta correspondiente
COPY ./css /usr/share/nginx/css

COPY ./js /usr/share/nginx/js
