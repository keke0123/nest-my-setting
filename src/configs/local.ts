export default {
  service: {
    env: 'local',
    log: {
      level: 'debug'
    },
  },
  mysql: {
    host: "localhost",
    port: 3307,
    username: 'root',
    password: 'wjdgyqja88',
  },
  redis: {
    host: 'localhost',
    port: 6378,
    db: 0,
  },
  slack: {
    url: {
      log: '',
    }
  },
}