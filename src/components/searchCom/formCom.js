import React, { Component } from "react";
import Proptypes from "prop-types";
import FormInputItem from "../antdItem/FormInputItem";
import FormSelectItem from "../antdItem/FormSelectItem";
import FormTimerItem from "../antdItem/FormTimerItem";
import FormTextAreaItem from "../antdItem/FormTextAreaItem";
import FormFileItem from "../antdItem/FormFileItem";
import "./index.less";

class SearchCom extends Component {
	static propTypes = {
		searchArr: Proptypes.array,
		defaultValue: Proptypes.object
	};
	static defaultProps = {
		searchArr: [],
		defaultValue: {}
	};
	
	_renderItem() {
		const { searchArr, defaultValue} = this.props;
		return searchArr.map(item => {
			const { type } = item;
			switch (type) {
				case 'input':
					return FormInputItem(item, defaultValue);
				case 'select':
					return FormSelectItem(item, defaultValue);
				case 'timer':
					return FormTimerItem(item, defaultValue);
				case 'textArea':
					return FormTextAreaItem(item, defaultValue);
				case 'file':
					return FormFileItem(item, defaultValue);
				default:
					return null
			}
		})
	}
	render() {
		return (
			<div className="form_com">
				{this._renderItem()}
			</div>
		);
	}
}

export default SearchCom;
