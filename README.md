# Buckutt-Server

## Installation

Required : node/io.js, npm, rethinkdb, mocha, gulp
Optional : chateau

```sh
source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install node npm rethinkdb
sudo npm install -g chateau mocha gulp
npm install
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
