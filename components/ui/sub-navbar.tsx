import { HomeSVGIcon } from './icons';

export const SubNavbar = () => {
  return (
    <div className="h-10.5 w-full bg-primary px-2">
      <div className="max-w-xl2 mx-auto flex items-end h-full">
        <button
          className="flex items-center justify-center cursor-pointer  bg-background w-16 h-10 rounded-t-[0.5rem]"
          aria-label="Home"
        >
          <HomeSVGIcon />
        </button>
      </div>
    </div>
  );
};
