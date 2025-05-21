
import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface PensionResultProps {
  basicPension: number;
  personalPension: number;
  totalPension: number;
  replacementRate: number;
  monthlySalary: number;
  onReset: () => void;
}

export const PensionResult: React.FC<PensionResultProps> = ({
  basicPension,
  personalPension,
  totalPension,
  replacementRate,
  monthlySalary,
  onReset,
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-2xl font-bold text-pension-blue">
            您的养老金预估结果
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-pension-blue">
              {formatCurrency(totalPension)} <span className="text-lg">元/月</span>
            </div>
            <p className="mt-2 text-pension-gray">
              相当于当前工资收入的{" "}
              <span className="font-semibold text-pension-blue">
                {Math.round(replacementRate)}%
              </span>
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">基础养老金</span>
                <span className="font-semibold">{formatCurrency(basicPension)} 元/月</span>
              </div>
              <Progress 
                value={(basicPension / totalPension) * 100} 
                className="h-2 bg-pension-light-gray" 
              />
              <p className="text-xs text-pension-gray mt-1">
                占总养老金 {Math.round((basicPension / totalPension) * 100)}%
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">个人账户养老金</span>
                <span className="font-semibold">{formatCurrency(personalPension)} 元/月</span>
              </div>
              <Progress 
                value={(personalPension / totalPension) * 100} 
                className="h-2 bg-pension-light-gray" 
              />
              <p className="text-xs text-pension-gray mt-1">
                占总养老金 {Math.round((personalPension / totalPension) * 100)}%
              </p>
            </div>
          </div>

          <Separator />
          
          <div className="text-sm text-pension-gray">
            <p>计算说明：</p>
            <ul className="list-disc list-inside">
              <li>基础养老金 = 当地平均工资×(1+平均缴费档次)÷2×缴费年限×1%</li>
              <li>个人账户养老金 = 个人账户里的钱÷计发月数</li>
              <li>本计算结果仅供参考，实际养老金以当地社保部门核定为准</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={onReset} 
        variant="outline" 
        className="w-full border-pension-gray text-pension-gray"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> 返回重新计算
      </Button>
    </div>
  );
};

export default PensionResult;
