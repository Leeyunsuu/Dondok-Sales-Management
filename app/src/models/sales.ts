import { Data, SalesStorage } from './SalesStorage';

interface SalesOfWeek {
  week: number;
  sales: number;
}

export class Sales {
  public userId: number | undefined;
  public year: number;
  public month: number;
  public days?: number;
  public sales?: number;
  constructor(
    userId: number | undefined,
    year: number,
    month: number,
    days?: number,
    sales?: number
  ) {
    this.userId = userId;
    this.year = year;
    this.month = month;
    this.days = days;
    this.sales = sales;
  }

  async monthInfo() {
    try {
      const monthInfo = await SalesStorage.GetSalesMonth(
        this.userId,
        this.year,
        this.month
      );
      return { success: true, data: monthInfo };
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async dayInfo() {
    try {
      const dayInfo = await SalesStorage.GetSalesDay(
        this.userId,
        this.year,
        this.month,
        this.days
      );
      if (dayInfo[0]) return { success: true, data: dayInfo[0] };
      else {
        const dummyData = {
          id: 0,
          year: this.year,
          month: this.month,
          days: this.days,
          sales: 0,
        };
        return { success: true, data: dummyData };
      }
    } catch (err) {
      return { success: false, msg: '오류', err };
    }
  }

  async inputSales() {
    try {
      await SalesStorage.SaveSalesInfo(
        this.userId,
        this.year,
        this.month,
        this.days,
        this.sales
      );
      return { success: true, msg: '입력완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }

  async updateSales() {
    try {
      await SalesStorage.UpdateSalesInfo(
        this.userId,
        this.year,
        this.month,
        this.days,
        this.sales
      );
      return { success: true, msg: '수정완료.' };
    } catch (err) {
      return { success: false, msg: '입력 오류', err };
    }
  }

  static processSalesData_Month(data: Data[] | undefined) {
    if (!data) {
      console.log('데이터가 없음');
    } else {
      const salesOfMonth: number = data.reduce((result: number, info: Data) => {
        result = result + info.sales;
        return result;
      }, 0);
      return salesOfMonth;
    }
  }

  static processSalesData_Weeks(
    year: number,
    month: number,
    data: Data[] | undefined
  ): SalesOfWeek[] | void {
    if (!data) {
      console.log('데이터가 없음');
    } else {
      const salesOfWeeks: SalesOfWeek[] = [];
      const thisLast: Date = new Date(year, month, 0);
      const TLDate: number = thisLast.getDate();
      const thisDates: Array<number> = [...Array(TLDate + 1).keys()].slice(1);
      //한달// 몰겠으면 log 찍어보셈.

      thisDates.reduce((result, dates) => {
        const date = new Date(year, month - 1, dates);
        const salesInit = date.getDay();
        const salesOfDate = data.filter((index: Data) => index.days === dates);
        if (salesInit === 0 || dates === TLDate) {
          //일요일 or 마지막날
          salesOfWeeks.push({ week: dates, sales: result });
          result = 0;
        }
        if (salesOfDate[0]) {
          result = result + salesOfDate[0].sales;
          return result;
        } else {
          return result;
        }
      }, 0);
      return salesOfWeeks;
    }
  }
}
