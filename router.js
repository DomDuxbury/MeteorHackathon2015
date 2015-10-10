
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('surprise');
  this.route('test');
  this.route('home', {
    path: '/',  //overrides the default '/home'
  });
});


