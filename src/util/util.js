// 获取今天的日期 并格式化
export function getToday(){
    let date = new Date();
    let y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y + '-' + m + '-' + d;
}

// 取绝对值 Math.abs()
// 向上取整 Math.ceil()
// 向下取整 Math.floor()
// 只保留整数部分 Math.parseInt()
// 四舍五入 Math.round()
// 随机数（0~1）Math.random()

// 计算两个日期相差了几天
export function countDateDiff(date1,date2){
 let date1Stamp = date1.getTime();
 let date2Stamp = date2.getTime();
 let stampDiff = Math.abs(date1Stamp-date2Stamp)
 var diffNum = Math.ceil(stampDiff/1000/60/60/24)
 return diffNum
}
export const unitPriceCare = 300
export const unitPriceTreat = 300