module.exports = {
  apps: [{
    name: 'BuyTheWay_API',
    script: 'server.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      "key": "./awsEc2.pem",
      user: 'ubuntu',
      host: 'ec2-54-164-43-47.compute-1.amazonaws.com',
      ref: 'origin/master',
      repo: 'git@github.com:O-clock-X/BuyTheWay-Back.git',
      path: '/home/ubuntu',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
