import React from 'react';
import { Icon } from 'antd';

import './NavBar.scss';
import { navItems } from '../../config/nav-items-config';
import { MenuItems } from './MenuItems/MenuItems';
import { UserInfo } from './UserInfo/UserInfo';

export const NavBar = ({
	maxWidth = {
		minWidth: '200px',
		maxWidth: '200px',
		width: '200px'
	},
	minWidth = {
		minWidth: '50px',
		maxWidth: '50px',
		width: '50px'
	}
}) => {
	const [ collapsed, setCollaped ] = React.useState(false);
	const onCollapse = (e) => {
		e.stopPropagation();
		setCollaped(!collapsed);
	};
	const realWidth = collapsed ? minWidth : maxWidth;
	return (
		<div className="nav-layout" style={{ ...realWidth }} >
			<nav className="d-flex-col nav-bar" style={{ ...realWidth }}>
				<UserInfo collapsed={collapsed} />
				<div className="menu">
					<MenuItems collapsed={collapsed} items={navItems} />
				</div>
				<div className="nav-bar-trigger d-flex-center" style={{ ...realWidth }} onClick={onCollapse}>
					<span>
						{collapsed ? (
							<Icon style={{ fontSize: '24px' }} type="caret-left" />
						) : (
							<Icon style={{ fontSize: '24px' }} type="caret-right" />
						)}
					</span>
				</div>
			</nav>
		</div>
	);
};
