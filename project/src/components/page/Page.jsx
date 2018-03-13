import React, { Component } from 'react'
import { Pagination, Icon } from 'antd-mobile'

import './Page.css'

class Page extends Component {
	render(){
		return (
			<div className="pagination-container" >
				<Pagination total={5}
				  className="custom-pagination-with-icon"
				  current={1}
				  locale={{
				    prevText: (<span className="arrow-align"><Icon type="left" />上一步</span>),
				    nextText: (<span className="arrow-align">下一步<Icon type="right" /></span>),
				  }}
				/>
			</div>
		)
	}
};

export default Page;
