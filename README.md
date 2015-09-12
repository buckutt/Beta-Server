# Buckutt-Server

## Installation

Required : node/io.js, npm, rethinkdb, mocha, gulp, openssl
Optional : chateau

```sh
source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install node npm rethinkdb openssl
sudo npm install -g chateau mocha gulp
npm install
```

### SSL

```sh
# CA Key and Certificate
openssl genrsa -aes256 -out ca.key 4096
openssl req -new -x509 -days 365 -key ca.key -out ca.crt

# Create the Server Key CSR and Certificate
openssl genrsa -aes256 -out server.key 4096
openssl req -new -key server.key -out server.csr

# Self Signing
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

# Create the Client Key and CSR
openssl genrsa -aes256 -out test.key 4096
openssl req -new -key test.key -out test.csr

# Sign client certificate
openssl x509 -req -days 365 -in test.csr -CA ca.crt -CAkey ca.key -set_serial 02 -out test.crt

# Pack client key and certificate to be used in browsers
openssl pkcs12 -export -clcerts -in test.crt -inkey test.key -out test.p12

# Remove password from server key
openssl rsa -in server.key -out server.key.nopwd && mv server.key.nopwd server.key
```

## Starting

```sh
npm run startdb # db server in background
npm run start # compile + start
```

## Testing

```sh
npm run startdb # db server in background
npm run starttest # compile + start in test environment
npm run test # test runner (in another tab)
```

## Cleaning

```sh
npm run stopdb # kills properly rethinkdb
npm run cleardb # removes rethinkdb_data directory (clear all the database)
npm run clean # removes the compiled (app) directory
```

## Chateau

Chateau is another admin tool that has the only advantage to see table contents without going in the data explorer
and type `r.db('db').table('table')`.
Usage :
```sh
chateau
```

Then, go to http://localhost:3000/. The application may say sometimes that an error occured while emptying tables, or
whatever. Ignore it, they're functionning.
