import { createSelector } from "reselect"

export const getPolicyIndexById = (policies = [], id) => {
    return policies.findIndex(item => item._id === id)
}

export const sortPolicies = (policies = []) => {
    // sort by length voucher_persent
    let result = policies.sort((a, b) => a.voucher_percent.length - b.voucher_percent.length)
    // sort by extra_persent
    result = result.sort((a, b) => {
        if(a.voucher_percent.length - b.voucher_percent.length <= 0)
            return a.extra_percent - b.extra_percent
        return a.voucher_percent.length - b.voucher_percent.length
    })
    return result
}

export const sortPoliciesByIsDeleted = (policies = []) => {
    return policies.sort((a, b) => a.isDeleted - b.isDeleted)
}

export const getActivePolicy = (policies = []) => policies.filter(policy => policy.isDeleted === false)

export const getActivePolicySelector = createSelector(
    [getActivePolicy],
    policies => sortPolicies(policies)
)