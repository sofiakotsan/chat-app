import React, { Component } from 'react'
import { Provider } from 'react-redux';
import store from '../redux/store';

export default (ChildComponent) => {
	return class ProviderHOC extends Component {

		render() {
			return (
				<Provider store={store}>
                    <ChildComponent/>
                </Provider>
			)
		}
	}
}