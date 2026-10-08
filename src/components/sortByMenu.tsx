import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export type SortFilter = "All" | "rating" | "costLowToHigh" | "costHighToLow";

interface SortByMenuProps {
  selectFilter: SortFilter;
  setSelectFilter: React.Dispatch<React.SetStateAction<SortFilter>>;
}

const SortByMenu = ({ selectFilter, setSelectFilter }: SortByMenuProps) => {
  return (
    <NativeSelect
      value={selectFilter}
      onChange={(e) => setSelectFilter(e.target.value as SortFilter)}
    >
      <NativeSelectOption value="All">All </NativeSelectOption>
      <NativeSelectOption value="rating">Rating</NativeSelectOption>
      <NativeSelectOption value="costLowToHigh">
        Cost: Low to High
      </NativeSelectOption>
      <NativeSelectOption value="costHighToLow">
        Cost: High to Low
      </NativeSelectOption>
    </NativeSelect>
  );
};

export default SortByMenu;
