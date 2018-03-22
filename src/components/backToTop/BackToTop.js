import React from 'react'
import './BackToTop.css'

const BackToTop = ({ backToTop, showBackToTop }) => {
	return (
		<div className="backToTop" onClick={backToTop} style={{ display: showBackToTop ? 'block': 'none'}}>
			<span>回到顶部</span>
		</div>
	)
}

export default BackToTop;