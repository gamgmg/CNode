// 时间戳转换成刚刚、几分钟前、几小时前、几天前
export default function getDateDiff(dateTimeStamp){
    let result;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    // let halfamonth = day * 15;
    let month = day * 30;
    let now = Date.now();
    let diffValue = now - dateTimeStamp;
    if(diffValue < 0){
        return;
    }
    let monthC =diffValue/month;
    let weekC =diffValue/(7*day);
    let dayC =diffValue/day;
    let hourC =diffValue/hour;
    let minC =diffValue/minute;
    if(monthC>=1){
        if(monthC<=12)
              result="" + parseInt(monthC, 10) + "月前";
        else{
          result="" + parseInt(monthC/12, 10) + "年前";
        }
    }
    else if(weekC>=1){
        result="" + parseInt(weekC, 10) + "周前";
    }
    else if(dayC>=1){
        result=""+ parseInt(dayC, 10) +"天前";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC, 10) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC, 10) +"分钟前";
    }else{
        result="刚刚";
    }
    return result;
};

