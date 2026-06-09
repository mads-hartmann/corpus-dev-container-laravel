FROM mcr.microsoft.com/devcontainers/php:8.4

# Laravel Pail (the log viewer used by the dev workflow) requires the pcntl
# extension, which is not compiled into the base image.
RUN docker-php-ext-install pcntl
