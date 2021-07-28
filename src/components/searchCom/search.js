import React, { Component } from "react";
import Proptypes from "prop-types";
import { Form, Button, Popover } from "antd";
import FormInputItem from "../antdItem/FormInputItem";
import FormSelectItem from "../antdItem/FormSelectItem";
import FormTimerItem from "../antdItem/FormTimerItem";
import FormTextAreaItem from "../antdItem/FormTextAreaItem";
import FormFileItem from "../antdItem/FormFileItem";
import GroupInputItem from './../antdItem/GroupInputItem'
import { formItemLayout } from "./../../utils/common";
import "./index.less";

const ButtonGroup = Button.Group;
class SearchCom extends Component {
	static propTypes = {
		defaultValue: Proptypes.object,
		optionArr: Proptypes.array,
		othersArr: Proptypes.array,
        option1Arr: Proptypes.array,
        btns: Proptypes.array,
        isHideSearch: Proptypes.bool,
        isHideOtherSearch: Proptypes.bool,
        onRef: Proptypes.func,
        onLeftParamsChange: Proptypes.func,
		onSearch: Proptypes.func,
        onBtnClick: Proptypes.func,
	};
	static defaultProps = {
		optionArr: [],
		othersArr:[],
		defaultValue: {},
        isHideSearch: false,
        isHideOtherSearch: false,
        option1Arr: [],
        btns: [],
		onLeftParamsChange: () => { },
        onRef: () => {},
		onSearch: () => { },
        onBtnClick: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			leftSelectValue: undefined,
			leftValue: ''
		};
		this.formRef = React.createRef();
	}
	
	componentDidMount() {
		const { onRef } = this.props;
		onRef(this);
		this.initLeftOption()
	}

	initLeftOption = () => {
		const { optionArr } = this.props;
		this.setState({
			leftSelectValue: optionArr[0].name,
			leftValue: ''
        });
	}

	onLeftSelectChange = (value) => {
        this.setState({
            leftSelectValue: value,
            leftValue: '',
        });
	};
	
	onLeftInputChange = (e) => {
        const { onLeftParamsChange } = this.props;
        this.setState({
            leftValue: e.target.value,
        });
        onLeftParamsChange(e.target.value);
	};
	
	onLeftSearch = () => {
        const { leftSelectValue, leftValue } = this.state;
        const { onSearch } = this.props;
        onSearch({ [leftSelectValue]: leftValue });
        // 重置右侧搜索
        this.handleReset();
	};

	handleReset = () => {
		const { resetFields } = this.formRef?.current || {};
		resetFields && resetFields()
	}
	
	onFinish = (values) => {
		const { onSearch } = this.props;
		// 对 搜索条件进行特殊处理
		onSearch(values);
		// 左侧搜索重置
		this.initLeftOption();
    }
	
	_renderNewItem() {
		const { othersArr, defaultValue} = this.props;
		return othersArr.map(item => {
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

	_renderOthersSearch() {
        return (
			<Form
				ref={this.formRef}
				onFinish={this.onFinish}
				{...formItemLayout(8,16)}
			>
				<div className="others_arr">
					{this._renderNewItem()}
					<div className="others_arr_btns">
						<Button
							className="search_btn"
							type="danger"
							onClick={this.handleReset}
						>
							重置
						</Button>
						<Button
							className="search_btn"
							type="primary"
							htmlType="submit"
						>
							搜索
						</Button>
					</div>
				</div>
			</Form>
        );
    }

	_renderItem() {
        const { optionArr, isHideSearch, isHideOtherSearch } = this.props;
        const { leftValue, leftSelectValue } = this.state;
        if (isHideSearch) {
            return <div className="search_top_left" />;
        }
        return (
			<div className="search_top_left">
				{ GroupInputItem(leftSelectValue, optionArr, leftValue, this.onLeftSelectChange, this.onLeftInputChange)}
                <Button className="search_btn" type="primary" onClick={this.onLeftSearch}>
                    搜索
                </Button>
                {!isHideOtherSearch ? (
                    <Popover
                        content={this._renderOthersSearch()}
                        title={null}
                        trigger="click"
                        placement="bottomRight"
                    >
                        <Button className="search_btn">高级搜索</Button>
                    </Popover>
                ) : null}
            </div>
        );
	}

	_renderRightBtns() {
		const { btns, onBtnClick } = this.props;
        return (
            <ButtonGroup>
				{btns.map((item, index) => {
					const {type, isHide, disabled, label, name } = item;
                    return (
                        !isHide && (
                            <Button
                                key={`btns_${index}`}
                                type={type}
                                disabled={disabled}
                                onClick={() => onBtnClick(name)}
                            >
                                {label}
                            </Button>
                        )
                    );
                })}
            </ButtonGroup>
        );
    }
	
	render() {
		return (
			<div className="search_com">
				{this._renderItem()}
				{this._renderRightBtns()}
			</div>
		);
	}
}

export default SearchCom;
