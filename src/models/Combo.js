
export class voucher_item {
    constructor(voucher_id, count = 1) {
        this.voucher_id = voucher_id
        this.count = count
    }
}

export class Combo {
    constructor(_id, combo_name, description, value, state, from_date, to_date, voucher_array = [], isDeleted = false, days = 30) {
        this._id = _id
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

export class Voucher {
    constructor(_id, disscount, value, max_value, from_date, to_date, state, category, subcategory, times_to_use, isDeleted, description, voucher_name, point) {
        this._id = _id
        this.disscount = disscount
        this.value = value
        this.max_value = max_value
        this.from_date = from_date
        this.to_date = to_date
        this.state = state
        this.category = category
        this.subcategory = subcategory
        this.times_to_use = times_to_use
        this.isDeleted = isDeleted
        this.description = description
        this.voucher_name = voucher_name
        this.point = point
    }
}

