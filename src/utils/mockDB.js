import { createVoucherToAPI } from "../redux/actions/voucherx-actions/services"
import { randomNumberInRange, randomDate } from "."
import { persentList, services } from "../constant"
const date1 = new Date(2019, 1, 1)
const date2 = new Date(2019, 5, 5)
const date3 = new Date(2020, 1, 1)
const date4 = new Date(2020, 5, 5)
const valueList = Array.from({ length: 11 }, (_, i) => i * 10000)
export const voucherCreator = (start, end, type = 'buy') => {
    const startC = randomDate(date1, date2)
    const endC = randomDate(date3, date4)
    for (let i = start; i <= end; i++) {
        let data = {
            voucher_name: `${type} ${i}`,
            description: 'xxxxxxxxxxxxxxxxxxxx',
            discount: persentList[randomNumberInRange(0, 10)],
            value: valueList[randomNumberInRange(1, 10)],
            from_date: startC(),
            to_date: endC(),
            state: true,
            category: type,
            subcategory: services[randomNumberInRange(0, 3)],
            times_to_use: 0,
            rank: randomNumberInRange(0, 3)
        }
        createVoucherToAPI(data).then(res => {

        }).catch(err => {
            debugger
        })
    }
}