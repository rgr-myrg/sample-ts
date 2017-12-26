module.exports = function (config) {
 config.set({
   basePath: '',
   frameworks: ['browserify', 'jasmine'],
   files: [
     'src/main/test/*Spec.ts'
   ],
   exclude: [],
   preprocessors: {
     'src/main/test/*Spec.ts': ['browserify','coverage']
   },
   browserify: {
     debug: true,
     plugin: [['tsify', {target: 'es5'}]]
   },
   reporters: ['spec', 'coverage'],
   port: 9876,
   colors: true,
   logLevel: config.LOG_INFO,
   autoWatch: true,
   browserDisconnectTimeout: 1000,
   browserDisconnectTolerance: 0,
   browserNoActivityTimeout: 3000,
   captureTimeout: 3000,
   browserStack: {
     username: "",
     accessKey: "",
     project: "build-process",
     name: "Build Process Test Runner",
     build: "test",
     pollingTimeout: 5000,
     timeout: 3000
   },
   coverageReporter: {
     type: 'text'
   },
   customLaunchers: {
     chrome: {
       base: "BrowserStack",
       os: "Ubuntu",
       os_version: "16",
       browser: "chrome",
       browser_version: "latest"
     },
   },
   browsers: ['PhantomJS'],
   singleRun: false
})}
