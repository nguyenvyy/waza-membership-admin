import React, { useState } from 'react'
import {comboSalesDaily, comboSalesMonthly, comboSalesYearly, comboRevenueDaily, comboRevenueMonthly, comboRevenueYearly} from '../../redux/actions/report-actions/service'
import {DatePicker} from 'antd'
import moment from 'moment'
import { formatOfDateFromDB, dateFormat } from '../../constant'
const ReportPage = ({match, history}) => {
    const intitalState = {
        comboSalesDaily: [],
        comboSalesMonthly: [],
        comboSalesYearly: [],
        comboRevenueDaily: [],
        comboRevenueMonthly: [],
        comboRevenueYearly: [],
        fromDateDaily: new Date(),
        toDateDaily: new Date(),
        fromMonthDaily: new Date(),
        toMonthDaily: new Date(),
        fromYearDaily: '',
        toYearDaily: '',

    }
    const [toggle, setToggle] = useState(intitalState)
    const comboId = match.params.id

    const onChangeFromDateDaily = (from) => {
        setToggle({
            ...toggle,
            fromDateDaily:from.format(formatOfDateFromDB)
        })
    }

    const onChangeToDateDaily = (to) => {
        setToggle({
            ...toggle,
            toDateDaily:to.format(formatOfDateFromDB)
        })
    }

    const reportSalesDaily = () => {
        comboSalesDaily(comboId, toggle.fromDateDaily, toggle.toDateDaily)
        .then (res => {
            setToggle({
                ...toggle,
                comboSalesDaily: res
            })
        })
        
    }

    const reportRevenueDaily = () => {
         comboRevenueDaily(comboId, toggle.fromDateDaily, toggle.toDateDaily)
        .then (res => {
            setToggle({
                ...toggle,
                comboRevenueDaily: res
            })
        })
    }

    const onChangeFromMonthDaily = (from) => {
        setToggle({
            ...toggle,
            fromMonthDaily:from.format(formatOfDateFromDB)
        })
    }

    const onChangeToMonthDaily = (to) => {
        setToggle({
            ...toggle,
            toMonthDaily:to.format(formatOfDateFromDB)
        })
    }

    const reportSalesMonthly = () => {
        comboSalesMonthly(comboId, toggle.fromMonthDaily, toggle.toMonthDaily)
        .then (res => {
            setToggle({
                ...toggle,
                comboSalesMonthly: res
            })
        })
    }

    const reportRevenueMonthly = () => {
        comboRevenueMonthly(comboId, toggle.fromMonthDaily, toggle.toMonthDaily)
        .then (res => {
            setToggle({
                ...toggle,
                comboRevenueMonthly: res
            })
        })
    }

    const changeStartYear = (e) => {
        setToggle({
            ...toggle,
            fromYearDaily: e.target.value
        })
    }
    const changeEndYear = (e) => {
        setToggle({
            ...toggle,
            toYearDaily: e.target.value
        })
    }

    const reportSalesYearly = () => {
        comboSalesYearly(comboId, toggle.fromYearDaily, toggle.toYearDaily)
        .then (res => {
            setToggle({
                ...toggle,
                comboSalesYearly: res
            })
        })
    }

    const reportRevenueYearly = () => {
        comboRevenueYearly(comboId, toggle.fromYearDaily, toggle.toYearDaily)
        .then (res => {
            setToggle({
                ...toggle,
                comboRevenueYearly: res
            })
        })
    }
    return <div>
        <h1 className="title-voucher">Report Page</h1>
        <h1>Report Daily</h1>
            <DatePicker
                format={dateFormat}
                onChange={onChangeFromDateDaily}
                value={toggle.fromDateDaily === null ? null : moment(toggle.fromDateDaily, formatOfDateFromDB)}
            ></DatePicker>
            <DatePicker
                format={dateFormat}
                onChange={onChangeToDateDaily}
                value={toggle.toDateDaily === null ? null : moment(toggle.toDateDaily, formatOfDateFromDB)}
            ></DatePicker>
            <button onClick={reportSalesDaily}>Report Sales Daily</button>
            <button onClick={reportRevenueDaily}>Report Revenue Daily</button>
            <p>Revenue Daily</p>
            {!toggle.comboRevenueDaily.records ?
                <div>No content about report revenue daily</div> :
                <div>
                    {toggle.comboRevenueDaily.records && toggle.comboRevenueDaily.records.map(combo => {
                    return <div>
                    <p>Ngày: {combo.date}</p>
                    <p>Time stamp: {combo.timestamp}</p>
                    <p>Tổng cộng theo ngày: {combo.total}</p>
                    <p>Số lượng: {combo.count}</p>
                    </div>
                    })}
                    <p>Tổng số lượng: {toggle.comboRevenueDaily.count}</p>
                    <p>Tổng cộng tất cả: {toggle.comboRevenueDaily.total}</p>
                </div> 
            }
            <p>Sales Daily</p>
            {!toggle.comboSalesDaily.records ? 
                <div>No content about sales daily</div>: 
                <div>
                    {toggle.comboSalesDaily.records && toggle.comboSalesDaily.records.map(combo => {
                        return <div>
                            <p>Ngày: {combo.date}</p>
                            <p>Time stamp: {combo.timestamp}</p>
                            <p>Số lượng: {combo.count}</p>
                        </div>
                    })}
                        <p>Tổng: {toggle.comboSalesDaily.all}</p>
                </div>}
        <h1>Report Monthly</h1>
        <DatePicker
                format={dateFormat}
                onChange={onChangeFromMonthDaily}
                value={toggle.fromMonthDaily === null ? null : moment(toggle.fromMonthDaily, formatOfDateFromDB)}
            ></DatePicker>
            <DatePicker
                format={dateFormat}
                onChange={onChangeToMonthDaily}
                value={toggle.toMonthDaily === null ? null : moment(toggle.toMonthDaily, formatOfDateFromDB)}
            ></DatePicker>
            <button onClick={reportSalesMonthly}>Report Sales Monthly</button>
            <button onClick={reportRevenueMonthly}>Report Revenue Monthly</button>
            <p>Revenue Monthly</p>
            {!toggle.comboRevenueMonthly.records ?
                <div>No content about report revenue daily</div> :
                <div>
                    {toggle.comboRevenueMonthly.records && toggle.comboRevenueMonthly.records.map(combo => {
                    return <div>
                    <p>Ngày: {combo.date}</p>
                    <p>Time stamp: {combo.timestamp}</p>
                    <p>Tổng cộng theo ngày: {combo.total}</p>
                    <p>Số lượng: {combo.count}</p>
                    </div>
                    })}
                    <p>Tổng số lượng: {toggle.comboRevenueMonthly.count}</p>
                    <p>Tổng cộng tất cả: {toggle.comboRevenueMonthly.total}</p>
                </div> 
            }
            <p>Sales Monthly</p>
            {!toggle.comboSalesMonthly.records ? 
                <div>No content about sales daily</div>: 
                <div>
                    {toggle.comboSalesMonthly.records && toggle.comboSalesMonthly.records.map(combo => {
                        return <div>
                            <p>Ngày: {combo.date}</p>
                            <p>Time stamp: {combo.timestamp}</p>
                            <p>Số lượng: {combo.count}</p>
                        </div>
                    })}
                        <p>Tổng: {toggle.comboSalesMonthly.all}</p>
                </div>}
        <h1>Report Yearly</h1>
        <p>Nhập năm bắt đầu:</p><input value={toggle.fromYearDaily} onChange={changeStartYear}/>
        <p>Nhập năm kết thúc:</p><input value={toggle.toYearDaily} onChange={changeEndYear}/>
        <button onClick={reportSalesYearly}>Report Sales Yearly</button>
            <button onClick={reportRevenueYearly}>Report Revenue Yearly</button>
            <p>Revenue Yearly</p>
            {!toggle.comboRevenueYearly.records ?
                <div>No content about report revenue daily</div> :
                <div>
                    {toggle.comboRevenueYearly.records && toggle.comboRevenueYearly.records.map(combo => {
                    return <div>
                    <p>Ngày: {combo.date}</p>
                    <p>Time stamp: {combo.timestamp}</p>
                    <p>Tổng cộng theo ngày: {combo.total}</p>
                    <p>Số lượng: {combo.count}</p>
                    </div>
                    })}
                    <p>Tổng số lượng: {toggle.comboRevenueYearly.count}</p>
                    <p>Tổng cộng tất cả: {toggle.comboRevenueYearly.total}</p>
                </div> 
            }
            <p>Sales Yearly</p>
            {!toggle.comboSalesYearly.records ? 
                <div>No content about sales daily</div>: 
                <div>
                    {toggle.comboSalesYearly.records && toggle.comboSalesYearly.records.map(combo => {
                        return <div>
                            <p>Ngày: {combo.date}</p>
                            <p>Time stamp: {combo.timestamp}</p>
                            <p>Số lượng: {combo.count}</p>
                        </div>
                    })}
                        <p>Tổng: {toggle.comboSalesYearly.all}</p>
                </div>}
    </div>
}

export default ReportPage