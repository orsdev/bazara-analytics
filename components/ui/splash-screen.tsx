import Image from 'next/image';

export const SplashScreen = () => {
  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-background z-50"
      data-testid="splash-screen"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Bazara Logo"
          width={86}
          height={22}
          className="w-[86px] h-[22px] object-contain animate-pulse"
        />
      </div>
    </div>
  );
};
