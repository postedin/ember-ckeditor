module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
<<<<<<< HEAD
  launch_in_ci: [
    'Chrome',
  ],
  launch_in_dev: [
    'Chrome',
  ],
=======
  launch_in_ci: ['Chrome'],
  launch_in_dev: ['Chrome'],
>>>>>>> 1d0e1cc (v3.20.0...v3.28.6)
  browser_start_timeout: 120,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
  },
};
