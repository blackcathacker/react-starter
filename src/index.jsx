/** @jsx React.DOM */

var React = require('react')
var {Routes, Route, Redirect, NotFoundRoute} = require('react-router')
var Hello = require('./example/hello')
var Main = require('./example/main')
var Colors = require('./example/colors')
var Students = require('./admissions/admin.jsx')
var GameOfLife = require('./gameoflife/gameoflife.jsx')

var routes = <Routes>
  <Route name="hello" path="/hello/:name" handler={Hello}/>
  <Route name="index" path="/" handler={Main}/>
  <Route name="colors" path="/colors" handler={Colors}/>
	<Route name="students" path="/students" handler={Students}/>
	<Route name="gameoflife" path="/gameoflife" handler={GameOfLife}/>
</Routes>

React.render(routes, document.getElementById('main'));
