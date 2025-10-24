'use client';

import { SearchInput } from '../forms';
import { EditSVGIcon } from '../icons';
import { PanelSelector } from './panel-selector';

export const ControlPanel = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div className="h-11 w-full border-b p-2 bg-secondary">
      <div className="max-w-xl2 mx-auto flex justify-between items-center h-full gap-2">
        <div className="flex items-center gap-6">
          <PanelSelector />
          <button className="justify-center items-center flex cursor-pointer">
            <EditSVGIcon />
          </button>
        </div>
        <div className="max-w-68 w-full hidden xs:flex">
          <SearchInput
            placeholder="Search in service request"
            className="h-7 border-0"
            onChange={handleSearch}
            showKeyboardShortcut
          />
        </div>
      </div>
    </div>
  );
};
