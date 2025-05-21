
import React, { useState } from "react";
import PensionCalculatorForm from "@/components/PensionCalculatorForm";
import PensionResult from "@/components/PensionResult";
import { calculateTotalPension } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormData {
  monthlySalary: number;
  contributionYears: number;
  retirementAge: number;
  averageSalary: number;
  city: string;
}

interface PensionResult {
  basicPension: number;
  personalPension: number;
  totalPension: number;
  replacementRate: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("calculator");
  const [pensionResult, setPensionResult] = useState<PensionResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { toast } = useToast();

  const handleCalculate = (data: FormData) => {
    try {
      if (data.contributionYears < 15) {
        toast({
          title: "养老金提示",
          description: "缴费年限需要满15年才能领取养老金，计算结果仅供参考。",
          variant: "default"
        });
      }

      const result = calculateTotalPension(
        data.monthlySalary,
        data.averageSalary,
        data.contributionYears,
        data.retirementAge
      );

      setPensionResult(result);
      setFormData(data);
      setActiveTab("result");
    } catch (error) {
      console.error("计算出错:", error);
      toast({
        title: "计算出错",
        description: "请检查您输入的数据是否正确",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setActiveTab("calculator");
  };

  return (
    <div className="min-h-screen bg-pension-light-gray py-8 px-4 md:py-12">
      <div className="container max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pension-blue mb-2">
            养老金计算器
          </h1>
          <p className="text-pension-gray">
            快速估算您未来的退休金收入
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator" disabled={activeTab === "result"}>
              <Calculator className="mr-2 h-4 w-4" /> 计算器
            </TabsTrigger>
            <TabsTrigger value="result" disabled={!pensionResult}>
              <Info className="mr-2 h-4 w-4" /> 计算结果
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-4">
                <CardTitle>养老金计算</CardTitle>
                <CardDescription>
                  请输入您的基本信息，计算养老金预估值
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PensionCalculatorForm onCalculate={handleCalculate} />
              </CardContent>
            </Card>

            <Alert className="mt-6 bg-white">
              <AlertTitle className="font-semibold text-pension-blue">
                温馨提示
              </AlertTitle>
              <AlertDescription className="text-sm">
                本计算器根据现行政策进行估算，养老金计算结果仅供参考，实际以社保部门核定为准。
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="result">
            {pensionResult && formData && (
              <PensionResult
                basicPension={pensionResult.basicPension}
                personalPension={pensionResult.personalPension}
                totalPension={pensionResult.totalPension}
                replacementRate={pensionResult.replacementRate}
                monthlySalary={formData.monthlySalary}
                onReset={handleReset}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
