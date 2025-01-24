FROM php:8.4-apache

# Instalar extensiones necesarias
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

# Activar el mod_rewrite en Apache
RUN a2enmod rewrite

# Asegurarte de que Apache permita sobrescribir la configuración del directorio
RUN echo '<Directory /var/www/html>' >> /etc/apache2/apache2.conf \
  && echo '    AllowOverride All' >> /etc/apache2/apache2.conf \
  && echo '</Directory>' >> /etc/apache2/apache2.conf

# Copiar el archivo .htaccess a la raíz de tu aplicación
COPY ./backend/.htaccess /var/www/html/.htaccess