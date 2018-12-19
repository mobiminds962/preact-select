import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Select from './select';

export default class App extends Component {
	
	constructor() {
		super();
		this.selectOptions = [{
          id: 0,
          title: 'Apple',
          selected: false
        },
        {
          id: 1,
          title: 'Orange',
          selected: false
        },
        {
          id: 2,
          title: 'Grape',
          selected: false
        }];
	}

	resetThenSet = (id) => {
	    let temp = JSON.parse(JSON.stringify(this.selectOptions))
	    temp.forEach(item => item.selected = false);
	    temp[id].selected = true;
	  }

	render() {
		return (
			<div id="app">
				<Select title="Select Item" list={this.selectOptions} resetThenSet={this.resetThenSet} />
			</div>
		);
	}
}
