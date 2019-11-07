import { createSelector } from "reselect"

export const getPolicyIndexById = (policies = [], id) => {
    return policies.findIndex(item => item._id === id)
}

export const getActivePolicy = (policies = []) => policies.filter(policy => policy.isDeleted === false)

export const getActivePolicySelector =  createSelector (
    [getActivePolicy],
    policies => policies
)