import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router'

import './Policy.scss'
import { Header } from '../common/Header/Header'
import {
    featchFullComboPolicy,
    requestAddComboPolicy,
    requestEditComboPolicy,
    requestDeleteComboPolicy
} from '../../redux/actions/policy-actions/action'
import { PolicyPanel } from './Panel'
import { ListPolicy } from './ListPolicy'
import { Empty } from 'antd'
import { AddPolicy } from './AddPolicy'
import { EditPolicy } from './EditPolicy'
const Policy = () => {
    const dispatch = useDispatch()
    const policies = useSelector(state => state.policy.combo)
    const isFetching = useSelector(state => state.policy.isFetching)

    useEffect(() => {
        if (policies.length === 0) {
            dispatch(featchFullComboPolicy())
        }
    }, [dispatch, policies.length])


    return (
        <div className="policy">
            <Header title="Policy" />
            <div className="wrapper">
                <div className="wrapper__left">
                    <PolicyPanel />
                    <ListPolicy 
                        isFetching={isFetching}
                        dispatch={dispatch}
                        policies={policies}
                        requestDeleteComboPolicy={requestDeleteComboPolicy}
                    />
                </div>
                <div className="wrapper__right">
                <Switch>
                        <Route exact path={`/a/policy`} render={() => <Empty />} />
                        <Route path={`/a/policy/add`} render={props => (
                            <AddPolicy
                                {...props}
                                dispatch={dispatch}
                                isFeatching={isFetching}
                                requestAddComboPolicy={requestAddComboPolicy}
                            />
                        )} />
                        <Route path={`/a/policy/edit/:id`} render={props => {
                            const id = props.match.params.id;
                            const policy = policies.find(item => item._id === id)
                            return (
                                <EditPolicy
                                    {...props}
                                    isFeatching={isFetching}
                                    category={policy ? policy : false}
                                    requestEditComboPolicy={requestEditComboPolicy}
                                />)
                        }} />
                    </Switch>

                </div>

            </div>

        </div>
    )
}

export default Policy