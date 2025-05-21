
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PAYMENT_MONTHS, CONTRIBUTION_RATIO } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 计算基础养老金
export function calculateBasicPension(
  averageSalary: number,
  contributionYears: number,
  contributionRatio: number
): number {
  // 基础养老金 = 当地平均工资 × (1 + 平均缴费档次) ÷ 2 × 缴费年限 × 1%
  // 平均缴费档次用缴费比例代替
  return (averageSalary * (1 + contributionRatio) / 2) * contributionYears * 0.01;
}

// 计算个人账户养老金
export function calculatePersonalPension(
  monthlySalary: number, 
  contributionYears: number, 
  retirementAge: number
): number {
  // 个人账户养老金 = 个人账户里的钱 ÷ 计发月数
  const personalAccount = monthlySalary * CONTRIBUTION_RATIO * 12 * contributionYears;
  const paymentMonths = PAYMENT_MONTHS[retirementAge] || 139; // 默认使用60岁的计发月数
  
  return personalAccount / paymentMonths;
}

// 计算总养老金
export function calculateTotalPension(
  monthlySalary: number,
  averageSalary: number,
  contributionYears: number,
  retirementAge: number
): {
  basicPension: number;
  personalPension: number;
  totalPension: number;
  replacementRate: number;
} {
  // 使用0.6作为一般的缴费档次
  const contributionRatio = 0.6;
  
  const basicPension = calculateBasicPension(
    averageSalary,
    contributionYears,
    contributionRatio
  );
  
  const personalPension = calculatePersonalPension(
    monthlySalary,
    contributionYears,
    retirementAge
  );
  
  const totalPension = basicPension + personalPension;
  
  // 计算替代率（养老金占工资的百分比）
  const replacementRate = (totalPension / monthlySalary) * 100;
  
  return {
    basicPension,
    personalPension,
    totalPension,
    replacementRate,
  };
}

// 格式化金额，保留两位小数
export function formatCurrency(amount: number): string {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
