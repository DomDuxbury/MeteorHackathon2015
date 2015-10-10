
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('surprise');
  this.route('Test');
  this.route('home', {
    path: '/',  //overrides the default '/home'
  });
});


