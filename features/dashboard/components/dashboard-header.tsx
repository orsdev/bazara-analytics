import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between gap-6 mb-4">
      <p className="font-bold">Home</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-normal hidden sm:block">Dashboard View:</p>
        <Select defaultValue="overall">
          <SelectTrigger
            className="h-8! font-normal text-sm"
            aria-label="Dashboard View Selector"
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overall">Overall Dashboard View</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
