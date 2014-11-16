var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.spec\.js$/.test(file)) {

      console.log(file)
      tests.push(file);
    }
  }
}

requirejs.config({
  deps: tests,
  callback: window.__karma__.start
});
