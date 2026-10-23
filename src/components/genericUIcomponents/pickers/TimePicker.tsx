import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Clock } from "lucide-react";
import { useState } from "react";

const TimePicker = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
})=>{
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(value.split(":")[0] || "09");
  const [minute, setMinute] = useState(value.split(":")[1] || "00");

  const confirm = () => {
    onChange(`${hour}:${minute}`);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setHour(value.split(":")[0] || "09");
          setMinute(value.split(":")[1] || "00");
        }
        setOpen(nextOpen);
      }}
    >
      <PopoverTrigger >
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full justify-start gap-2 font-normal"
        >
          <Clock className="size-4 text-muted-foreground" />
          {value || label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 space-y-4">
        <p className="font-medium">{label}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-2">
            <Label>Hour</Label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="h-11 w-full rounded-md border bg-background px-2"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <span className="mt-6 text-xl">:</span>
          <div className="flex-1 space-y-2">
            <Label>Minute</Label>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="h-11 w-full rounded-md border bg-background px-2"
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button type="button" className="w-full" onClick={confirm}>
          Confirm time
        </Button>
      </PopoverContent>
    </Popover>
  );
}
export default TimePicker 