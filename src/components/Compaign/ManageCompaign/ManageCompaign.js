import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import './ManageCompaign.scss'
import { Header } from '../../common/Header/Header'
import { Empty } from 'antd'
import { AddCompaign } from './AddCompaign'
const managePath = '/a/compaign/manage';
export const ManageCompaign = () => {
    return (
        <div className="manage-compaign">
            <Header title="Manage Compaigns" />
            <div className="wrapper">
                <div className="wrapper__left">
                    <div className="manage-compaign-panel">
                        <NavLink
                            to={`${managePath}/add`}
                            className="manage-compaign-panel__add"
                            activeClassName="manage-compaign-panel__add--active"
                        >new</NavLink>
                    </div >
                </div>
                <div className="wrapper__right">
                    <Switch>
                        <Route exact path={managePath} render={() => <Empty />} />
                        <Route path={`${managePath}/add`} component={AddCompaign}  />
                    </Switch>
                </div>
            </div>
        </div>
    )
}