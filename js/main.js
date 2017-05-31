'use strict';

var app = {};

app.handleRequest = function (event, controllerName) {
  var fullControllerName = controllerName + 'Controller';
  var constructorController = eval(fullControllerName);
  var controller = new constructorController();
  controller.onInit();
};

app.book = {};

$.address.change(function (event) {
  app.handleRequest(event, 'index');
});