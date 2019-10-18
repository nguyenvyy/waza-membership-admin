
export class voucher_item {
    constructor(voucherId, count = 1) {
        this.voucherId = voucherId
        this.count = count
    }
}

export class Combo {
    constructor(id, combo_name, description, value, state, from_date, to_date, voucher_array = [], isDeleted = false, days = 30) {
        this.id = id
        this.name = combo_name
        this.value = value
        this.state = state
        this.fromDate = from_date
        this.toDate = to_date
        this.isDeleted = isDeleted
        this.voucherIdArray = voucher_array
        this.description = description
        this.days = days
    }
}

