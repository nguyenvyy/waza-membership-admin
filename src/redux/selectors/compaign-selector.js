import { comboStatus } from "../../constant/combo"
import moment from "moment"

export const getCompaignIndexById = (compaigns = [], id) => compaigns.findIndex(compaign => compaign._id === id)
export const getCompaignById = (compaigns = [], id) => compaigns.find(compaign => compaign._id === id)

export const checkIsActiveCompaign = compaign => {
    if (compaign.isDeleted) return comboStatus.deleted
    const presentTime = Date.now();
    const fromDate = moment(compaign.from_date).valueOf()
    const toDate = moment(compaign.to_date).valueOf()
    if(presentTime <= toDate) {
        if(presentTime < fromDate) {
            return comboStatus.wait
        } else {
            return comboStatus.active
        }
    }
    return comboStatus.stop
}

export const checkStatusCompaign = compaign => {
    switch (checkIsActiveCompaign(compaign)) {
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