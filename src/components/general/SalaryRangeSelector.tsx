import { formatCurrency } from '@/app/utils/formatCurrency';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Slider } from '../ui/slider';

interface iAppProps {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  currency: string;
  step: number;
}
export default function SalaryRangeSelector({ control, currency, minSalary, maxSalary, step }: iAppProps) {
  const { field: fromField } = useController({
    name: 'salaryFrom',
    control,
  });

  const { field: toField } = useController({
    name: 'salaryTo',
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  const handleChangeRange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  };

  return (
    <div className="w-full space-y-4">
      <Slider min={minSalary} max={maxSalary} step={step} value={range} onValueChange={handleChangeRange} />
      <div className="flex justify-between">
        <span>{formatCurrency(currency, range[0])}</span>
        <span>{formatCurrency(currency, range[0])}</span>

      </div>
    </div>
  );
}
