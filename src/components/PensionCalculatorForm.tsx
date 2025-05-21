
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  CITY_AVERAGE_SALARIES, 
  DEFAULT_CONTRIBUTION_YEARS, 
  DEFAULT_RETIREMENT_AGE, 
  DEFAULT_SALARY,
  DEFAULT_CITY
} from "@/lib/constants";

interface PensionCalculatorFormProps {
  onCalculate: (data: FormData) => void;
}

interface FormData {
  monthlySalary: number;
  contributionYears: number;
  retirementAge: number;
  averageSalary: number;
  city: string;
}

export const PensionCalculatorForm: React.FC<PensionCalculatorFormProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState<FormData>({
    monthlySalary: DEFAULT_SALARY,
    contributionYears: DEFAULT_CONTRIBUTION_YEARS,
    retirementAge: DEFAULT_RETIREMENT_AGE,
    averageSalary: CITY_AVERAGE_SALARIES[DEFAULT_CITY],
    city: DEFAULT_CITY,
  });

  const [customAverageSalary, setCustomAverageSalary] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      setFormData({
        ...formData,
        [name]: numValue,
      });
    }
  };

  const handleCityChange = (value: string) => {
    setFormData({
      ...formData,
      city: value,
      averageSalary: CITY_AVERAGE_SALARIES[value],
    });
    setCustomAverageSalary(false);
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({
      ...formData,
      [name]: value[0],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleToggleCustomSalary = () => {
    setCustomAverageSalary(!customAverageSalary);
    
    if (customAverageSalary) {
      // 切回到城市选择模式
      setFormData({
        ...formData,
        city: DEFAULT_CITY,
        averageSalary: CITY_AVERAGE_SALARIES[DEFAULT_CITY],
      });
    } else {
      // 切换到自定义工资模式
      setFormData({
        ...formData,
        city: "自定义",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="monthlySalary">当前月薪（元）</Label>
          <div className="flex items-center mt-1">
            <Input
              id="monthlySalary"
              name="monthlySalary"
              type="number"
              value={formData.monthlySalary}
              onChange={handleInputChange}
              className="w-full"
              min={0}
            />
          </div>
          <div className="mt-2">
            <Slider
              value={[formData.monthlySalary]}
              min={3000}
              max={30000}
              step={500}
              onValueChange={(value) => handleSliderChange("monthlySalary", value)}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-pension-gray">
              <span>3,000</span>
              <span>30,000</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="contributionYears">当前养老保险累计缴费年限（年）</Label>
          <div className="flex items-center mt-1">
            <Input
              id="contributionYears"
              name="contributionYears"
              type="number"
              value={formData.contributionYears}
              onChange={handleInputChange}
              className="w-full"
              min={1}
              max={50}
            />
          </div>
          <div className="mt-2">
            <Slider
              value={[formData.contributionYears]}
              min={1}
              max={40}
              step={1}
              onValueChange={(value) => handleSliderChange("contributionYears", value)}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-pension-gray">
              <span>1年</span>
              <span>40年</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="retirementAge">预期退休年龄</Label>
          <div className="flex items-center mt-1">
            <Input
              id="retirementAge"
              name="retirementAge"
              type="number"
              value={formData.retirementAge}
              onChange={handleInputChange}
              className="w-full"
              min={40}
              max={70}
            />
          </div>
          <div className="mt-2">
            <Slider
              value={[formData.retirementAge]}
              min={50}
              max={70}
              step={1}
              onValueChange={(value) => handleSliderChange("retirementAge", value)}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-pension-gray">
              <span>50岁</span>
              <span>70岁</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <Label>当地社会平均工资</Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={handleToggleCustomSalary}
              className="text-xs"
            >
              {customAverageSalary ? "选择城市" : "自定义输入"}
            </Button>
          </div>

          <div className="mt-1">
            {customAverageSalary ? (
              <div className="flex items-center">
                <Input
                  id="averageSalary"
                  name="averageSalary"
                  type="number"
                  value={formData.averageSalary}
                  onChange={handleInputChange}
                  className="w-full"
                  min={0}
                />
                <span className="ml-2 text-pension-gray">元/月</span>
              </div>
            ) : (
              <div>
                <Select value={formData.city} onValueChange={handleCityChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择城市" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(CITY_AVERAGE_SALARIES).map((city) => (
                      <SelectItem key={city} value={city}>
                        {city} - {CITY_AVERAGE_SALARIES[city]}元/月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-pension-blue hover:bg-pension-light-blue">
        <Calculator className="mr-2 h-4 w-4" /> 计算养老金
      </Button>
    </form>
  );
};

export default PensionCalculatorForm;
