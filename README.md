# hn-demo-app

Hacker News feed demo App for Reign Design.

## Clone & Install

```bash
$ git clone https://github.com/mallendeo/hn-demo-app
$ cd hn-demo-app
$ yarn # or npm install
```

## MongoDB

For this demo, a running MongoDB instance is required.

### With Docker
```bash
$ docker run --name hn-demo-mongo -p 27017:27017 -d mongo
```

### Without Docker

macOS

```bash
$ brew install mongodb --with-openssl
```

Linux / Ubuntu 16.04

```bash
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
```

## Set environment variables

```bash
$ export NODE_ENV=production
$ export PORT=3000
$ export MONGO_DB_PORT=27017

# Optional
# $ export MONGO_DB_URL=`mongodb://localhost:27017`
```

## Start the server

**Development**
```bash
$ npm run watch
```

**Production**
```bash
$ npm start
```

# PM2

For monitoring and running this app continuously, you can install pm2 globally or use the pm2 Docker image.
The provided pm2 example includes the mongo connection string which uses the Docker container hostname.
(`mongodb://hn-demo-mongo:27017`)

```bash
$ docker build -t hn-demo-app .
$ docker run --name hn-app --link hn-demo-mongo:mongo -p 3000:3000 --restart=always -d hn-demo-app
```

# License

MIT