import { comboStatus } from "../../constant/combo"
import moment from "moment"

export const getCampaignIndexById = (campaigns = [], id) => campaigns.findIndex(campaign => campaign._id === id)
export const getCampaignById = (campaigns = [], id) => campaigns.find(campaign => campaign._id === id)

export const checkIsActiveCampaign = campaign => {
    if (campaign.isDeleted) return comboStatus.deleted
    const presentTime = Date.now();
    const fromDate = moment(campaign.from_date).valueOf()
    const toDate = moment(campaign.to_date).valueOf()
    if(presentTime <= toDate) {
        if(presentTime < fromDate) {
            return comboStatus.wait
        } else {
            return comboStatus.active
        }
    }
    return comboStatus.stop
}

export const checkStatusCampaign = campaign => {
    switch (checkIsActiveCampaign(campaign)) {
        case comboStatus.deleted:
            return { text: comboStatus.deleted, processing: 'error' }
        case comboStatus.active:
            return { text: comboStatus.active, processing: 'processing' }
        case comboStatus.stop:
            return { text: comboStatus.stop, processing: 'default' }
        case comboStatus.wait:
            return { text: comboStatus.wait, processing: 'warning' }
        default:
            return { text: 'Unknown', processing: 'error' }
    }
}