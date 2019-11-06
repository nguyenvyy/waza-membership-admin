
export const getPolicyIndexById = (policies = [], id) => {
    return policies.findIndex(item => item._id === id)
}