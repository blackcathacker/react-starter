var React = require('react');
var GameOfLifeModel = require('./game_model');


var GameOfLife = React.createClass({
	getInitialState : function() {
		GameOfLifeModel.init(30, 60);
		return { model : GameOfLifeModel.getModel() };
	},
	render : function() {
		console.log("Testing");
		var rows = [];
		for (var x = 0; x < this.state.model.length; x++) {
			var row = [];
			for (var y = 0; y < this.state.model[x].length; y++) {
				row.push(<Cell cell={this.state.model[x][y]}/>);
			}
			rows.push(<Row cells={row}/>);
		}
		return <div><div className="gameGrid">{rows}</div>
			<button onClick={GameOfLifeModel.step}>Step</button>
			<button onClick={GameOfLifeModel.start}>Start</button>
			<button onClick={GameOfLifeModel.stop}>Stop</button>
			<button onClick={GameOfLifeModel.randomize}>Reset</button>
			</div>
	},
	componentDidMount: function() {
    	GameOfLifeModel.onChange(function () {
    		console.log("Changed");
      		this.setState({ model: GameOfLifeModel.getModel() });
      	}.bind(this));
	}
});

var Row = React.createClass({
	render : function() {
		return <div className="row">{this.props.cells}</div>;
	}
})

var Cell = React.createClass({
	render : function() {
		return <span className={this.props.cell ? "cell cell-on" : "cell cell-off"}> </span>;
	}
})

module.exports = GameOfLife;