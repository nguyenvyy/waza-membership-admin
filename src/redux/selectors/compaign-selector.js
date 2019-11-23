
export const getCompaignIndexById = (compaigns = [], id) => compaigns.findIndex(compaign => compaign._id === id)
export const getCompaignById = (compaigns = [], id) => compaigns.find(compaign => compaign._id === id)