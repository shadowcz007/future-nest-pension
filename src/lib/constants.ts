
// 退休年龄与对应的计发月数
export const PAYMENT_MONTHS: Record<number, number> = {
  40: 233,
  41: 230,
  42: 226,
  43: 223,
  44: 220,
  45: 216,
  46: 212,
  47: 207,
  48: 204,
  49: 199,
  50: 195,
  51: 190,
  52: 185,
  53: 180,
  54: 175,
  55: 170,
  56: 164,
  57: 158,
  58: 152,
  59: 145,
  60: 139,
  61: 132,
  62: 125,
  63: 117,
  64: 109,
  65: 101,
  66: 94,
  67: 87,
  68: 80,
  69: 73,
  70: 67,
};

// 主要城市社会平均工资（2023年）
export const CITY_AVERAGE_SALARIES: Record<string, number> = {
  "北京": 12634,
  "上海": 11396,
  "广州": 10862,
  "深圳": 11075,
  "杭州": 9383,
  "南京": 9054,
  "成都": 8523,
  "武汉": 8151,
  "西安": 7653,
  "重庆": 7554,
  "天津": 7547,
  "苏州": 9175,
  "宁波": 8587,
  "青岛": 7852,
  "长沙": 7654,
  "郑州": 7461,
  "厦门": 8014,
  "济南": 7361,
  "福州": 7284,
  "大连": 7156,
  "全国平均": 8058,
};

export const DEFAULT_RETIREMENT_AGE = 60;
export const DEFAULT_CONTRIBUTION_YEARS = 15;
export const DEFAULT_SALARY = 8000;
export const DEFAULT_CITY = "全国平均";
export const CONTRIBUTION_RATIO = 0.08; // 8% 个人缴费比例
