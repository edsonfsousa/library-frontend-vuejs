# _library-frontend-vuejs_

---

> _It is the Frontend of a library management and logistics application whose main objective is to rent books made by customers and to manage the bookstore, having standard book logistics functions within the application and resources such as Dashboard, being used for better bookstore monitoring. It has its Backend made in Java with Spring Boot, and Frontend built in JavaScript with Vuejs, in addition to other libraries, technologies and utility tools._

# _- Project setup_
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# _- Deploy instructions_

## Command used to remove container

```
docker container rm -f name-container
```

## Commands used to deploy the application with just Dockerfile

---

```
docker image build -t edsonfsousa/name-container:v1 .
```

```
docker container run -d -p 8080:80 --name edsonfsousa/name-container edsonfsousa/name-container:v1
```

## Commands used to deploy the application with docker-compose

---

```
docker-compose build
```

```
docker-compose up
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## _Contributing_
If you want, you can contribute in
[issue tracker](https://github.com/wda-trainee/startuplog-frontend/issues/new/choose).

Developed by
[Edson Fernandes](https://github.com/edsonfsousa) with [Vuejs](https://vuejs.org/) .
