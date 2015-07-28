var HelloMessage = React.createClass({displayName: "HelloMessage",
  render: function() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
});

React.render(React.createElement(HelloMessage, {name: "John"}), document.querySelector('#example1'));
var Timer = React.createClass({displayName: "Timer",
	getInitialState: function() {
		return {
			secondsElapsed: 0
		}
	},

	tick: function() {
		this.setState({
			secondsElapsed: this.state.secondsElapsed + 1
		});
	},

	componentDidMount: function() {
		this.interval = setInterval(this.tick, 1000);
	},

	componentWillUnmount: function() {
		clearInterval(this.interval);
	},

	render: function() {
		return (
			React.createElement("div", null, "Seconds Elapsed: ", this.state.secondsElapsed)
		)
	}
});

React.render(React.createElement(Timer, null), document.querySelector('#example2'));
var TodoList = React.createClass({displayName: "TodoList",
  render: function() {
    var createItem = function(itemText, index) {
      return React.createElement("li", {key: index + itemText}, itemText);
    };
    return React.createElement("ul", null, this.props.items.map(createItem));
  }
});

var TodoApp = React.createClass({displayName: "TodoApp",
	getInitialState: function() {
		return {
			items: [],
			text: ''
		}
	},

	onChange: function(e) {
		this.setState({text: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var nextItems = this.state.items.concat([this.state.text]);
		var nextText = '';
		this.setState({
			items: nextItems,
			text: nextText
		});
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("h3", null, "TODO"), 
				React.createElement(TodoList, {items: this.state.items}), 
				React.createElement("form", {onSubmit: this.handleSubmit}, 
					React.createElement("input", {onChange: this.onChange, value: this.state.text}), 
					React.createElement("button", null, 'Add # ' + (this.state.items.length + 1))
				)
			)
		)
	}
});

React.render(React.createElement(TodoApp, null), document.querySelector('#example3'));
var MarkdownEditor = React.createClass({displayName: "MarkdownEditor",
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: React.findDOMNode(this.refs.textarea).value});
  },
  render: function() {
    return (
      React.createElement("div", {className: "MarkdownEditor"}, 
        React.createElement("h3", null, "Input"), 
        React.createElement("textarea", {
          onChange: this.handleChange, 
          ref: "textarea", 
          defaultValue: this.state.value}), 
        React.createElement("h3", null, "Output"), 
        React.createElement("div", {
          className: "content", 
          dangerouslySetInnerHTML: {
            __html: marked(this.state.value, {sanitize: true})
          }}
        )
      )
    );
  }
});

React.render(React.createElement(MarkdownEditor, null), document.querySelector('#example4'));