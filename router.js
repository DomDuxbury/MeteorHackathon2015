
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('contact');
  this.route('home', {
    path: '/',  //overrides the default '/home'
  });
});


