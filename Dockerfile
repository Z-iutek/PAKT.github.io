# Wybieramy oficjalny obraz Nginx w wersji Alpine
FROM nginx:alpine

# Kopiujemy wszystkie pliki do domyślnego katalogu Nginxa
COPY . /usr/share/nginx/html

# Upewniamy się, że port 80 będzie dostępny
EXPOSE 80

# Uruchamiamy Nginx w trybie pierwszoplanowym (foreground)
CMD ["nginx", "-g", "daemon off;"]
