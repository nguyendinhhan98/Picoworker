module.exports = {
    apps: [
      {
        name: 'picoworker_backend',
        script: 'node dist/src/main.js',
        time: true,
        instances: 1,
        autorestart: true,
        max_restarts: 10,
        watch: [
            'dist/src/main.js'
        ],
        max_memory_restart: '1G',
        env: {
          PORT: 3128,
        },
      },
    ],
  }