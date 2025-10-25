import { SVGProps } from 'react';

interface CustomIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const BellSVGIcon = ({ size = 24, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...restProps}
    fill="none"
  >
    <path
      d="M8 4.29333V6.51334"
      stroke="#808080"
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <path
      d="M8.01339 1.33337C5.56005 1.33337 3.57339 3.32004 3.57339 5.77337V7.17337C3.57339 7.62671 3.38672 8.30671 3.15339 8.69337L2.30672 10.1067C1.78672 10.98 2.14672 11.9534 3.10672 12.2734C6.29339 13.3334 9.74005 13.3334 12.9267 12.2734C13.8267 11.9734 14.2134 10.92 13.7267 10.1067L12.8801 8.69337C12.6467 8.30671 12.4601 7.62004 12.4601 7.17337V5.77337C12.4534 3.33337 10.4534 1.33337 8.01339 1.33337Z"
      stroke="#808080"
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <path
      d="M10.22 12.5466C10.22 13.7666 9.22003 14.7666 8.00003 14.7666C7.39336 14.7666 6.83336 14.5133 6.43336 14.1133C6.03336 13.7133 5.78003 13.1533 5.78003 12.5466"
      stroke="#808080"
      strokeMiterlimit={10}
    />
  </svg>
);

export const GridSVGIcon = ({ size = 24, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <rect width="6.66667" height="7.22892" fill="#1659E6" />
    <rect x="8.66663" width="6.66667" height="7.22892" fill="#1659E6" />
    <rect x="17.3334" width="6.66667" height="7.22892" fill="#1659E6" />
    <rect y="8.3855" width="7.22892" height="7.22892" fill="#1659E6" />
    <rect
      x="8.3855"
      y="8.3855"
      width="7.22892"
      height="7.22892"
      fill="#1659E6"
    />
    <rect
      x="16.7711"
      y="8.3855"
      width="7.22892"
      height="7.22892"
      fill="#1659E6"
    />
    <rect y="16.7711" width="7.22892" height="7.22892" fill="#1659E6" />
    <rect
      x="8.3855"
      y="16.7712"
      width="7.22892"
      height="7.22892"
      fill="#1659E6"
    />
    <rect
      x="16.7711"
      y="16.7712"
      width="7.22892"
      height="7.22892"
      fill="#1659E6"
    />
  </svg>
);

export const AvatarSVGIcon = ({ size = 24, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <circle cx={18} cy={18} r={18} fill="#E8EEFD" />
    <mask
      id="mask0_1_3906"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={36}
      height={36}
    >
      <circle cx={18} cy={18} r={18} fill="#C4C4C4" />
    </mask>
    <g mask="url(#mask0_1_3906)">
      <ellipse cx="17.9997" cy="31.68" rx="13.68" ry="7.92" fill="#1659E6" />
    </g>
    <circle cx={18} cy="15.2999" r="6.48" fill="#1659E6" />
  </svg>
);

export const HamburgerSVGIcon = ({
  size = 24,
  ...restProps
}: CustomIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="rgba(22,89,230,1)"
    {...restProps}
  >
    <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z" />
  </svg>
);

export const LogoutSVGIcon = ({ size = 16, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M11.6267 9.74671L13.3334 8.04004L11.6267 6.33337"
      stroke="#E43A39"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.50671 8.04004H13.2867"
      stroke="#E43A39"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.84005 13.3333C4.89338 13.3333 2.50671 11.3333 2.50671 7.99996C2.50671 4.66663 4.89338 2.66663 7.84005 2.66663"
      stroke="#E43A39"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UserSVGIcon = ({ size = 24, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M7.99963 1.83337C9.56433 1.83337 10.8334 3.10172 10.8336 4.66638C10.8336 6.23119 9.56444 7.50037 7.99963 7.50037C6.43498 7.50019 5.16663 6.23108 5.16663 4.66638C5.1668 3.10183 6.43509 1.83355 7.99963 1.83337Z"
      fill="#1659E6"
      stroke="#1659E6"
    />
    <path
      d="M7.99994 9.66663C4.65994 9.66663 1.93994 11.9066 1.93994 14.6666C1.93994 14.8533 2.08661 15 2.27327 15H13.7266C13.9133 15 14.0599 14.8533 14.0599 14.6666C14.0599 11.9066 11.3399 9.66663 7.99994 9.66663Z"
      fill="#1659E6"
    />
  </svg>
);

export const HomeSVGIcon = ({ size = 16, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M6.01325 1.89336L2.41992 4.69336C1.81992 5.16003 1.33325 6.15336 1.33325 6.90669V11.8467C1.33325 13.3934 2.59325 14.66 4.13992 14.66H11.8599C13.4066 14.66 14.6666 13.3934 14.6666 11.8534V7.00003C14.6666 6.19336 14.1266 5.16003 13.4666 4.70003L9.34659 1.81336C8.41325 1.16003 6.91325 1.19336 6.01325 1.89336Z"
      stroke="#808080"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 11.9933V9.99329"
      stroke="#808080"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EditSVGIcon = ({ size = 16, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M8.84006 2.39994L3.36673 8.19327C3.16006 8.41327 2.96006 8.84661 2.92006 9.14661L2.6734 11.3066C2.58673 12.0866 3.14673 12.6199 3.92006 12.4866L6.06673 12.1199C6.36673 12.0666 6.78673 11.8466 6.9934 11.6199L12.4667 5.82661C13.4134 4.82661 13.8401 3.68661 12.3667 2.29327C10.9001 0.913274 9.78673 1.39994 8.84006 2.39994Z"
      stroke="#C4C5C7"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.92651 3.3667C8.21318 5.2067 9.70651 6.61337 11.5598 6.80003"
      stroke="#C4C5C7"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 14.6666H14"
      stroke="#C4C5C7"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PinchSVGIcon = ({ size = 16, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M13.9761 2.66669H11.3147M13.9761 2.66669C13.9761 3.04003 12.9821 3.73803 12.6454 4.00003M13.9761 2.66669C13.9761 2.29336 12.9821 1.59536 12.6454 1.33336M1.99939 2.66669H4.66072M1.99939 2.66669C1.99939 2.29336 2.99406 1.59536 3.33072 1.33336M1.99939 2.66669C1.99939 3.04003 2.99406 3.73803 3.33072 4.00003M6.54339 14.6667V14.04C6.54349 13.6079 6.40362 13.1874 6.14472 12.8414L3.59606 9.43536C3.38406 9.15269 3.22672 8.80936 3.32339 8.46936C3.56339 7.63003 4.51206 6.88403 5.57272 8.19803L6.63939 9.33669V2.39603C6.70472 1.17603 8.75472 0.791359 8.96672 2.39603V6.35136C9.95539 6.22469 14.6107 6.91869 13.9334 9.86136L13.8374 10.2854C13.6994 10.8974 13.2934 11.9867 12.8461 12.624C12.3801 13.2874 12.5981 14.3574 12.5447 14.668"
      stroke="#1659E6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UserCircleSVGIcon = ({
  size = 40,
  ...restProps
}: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <rect width={size} height={size} rx={20} fill="#E8EEFD" />
    <path
      d="M23.6201 13.6663C24.442 13.6664 25.1232 14.2921 25.2051 15.097L25.2129 15.2601C25.2062 16.1199 24.5307 16.8156 23.6816 16.846C23.638 16.8426 23.5945 16.8425 23.5508 16.846C22.7011 16.8151 22.0264 16.1185 22.0264 15.2601C22.0264 14.3834 22.7383 13.6663 23.6201 13.6663Z"
      fill="#1659E6"
      stroke="#1659E6"
      strokeWidth="0.666667"
    />
    <path
      d="M25.86 21.8C25.1133 22.3 24.0666 22.4866 23.1 22.36C23.3533 21.8133 23.4866 21.2066 23.4933 20.5666C23.4933 19.9 23.3467 19.2666 23.0667 18.7133C24.0533 18.58 25.1 18.7666 25.8533 19.2666C26.9067 19.96 26.9067 21.1 25.86 21.8Z"
      fill="#1659E6"
    />
    <path
      d="M16.2934 17.18C16.3401 17.1733 16.3867 17.1733 16.4334 17.18C17.4667 17.1466 18.2867 16.3 18.2867 15.26C18.2867 14.1933 17.4267 13.3333 16.3601 13.3333C15.3001 13.3333 14.4401 14.1933 14.4401 15.26C14.4401 16.3 15.2601 17.1466 16.2934 17.18Z"
      fill="#1659E6"
    />
    <path
      d="M16.3666 20.5666C16.3666 21.2133 16.5066 21.8266 16.76 22.38C15.82 22.48 14.84 22.28 14.12 21.8066C13.0666 21.1066 13.0666 19.9666 14.12 19.2666C14.8333 18.7866 15.84 18.5933 16.7866 18.7C16.5133 19.26 16.3666 19.8933 16.3666 20.5666Z"
      fill="#1659E6"
    />
    <path
      d="M20.0801 22.58C20.0267 22.5733 19.9667 22.5733 19.9067 22.58C18.6801 22.54 17.7001 21.5333 17.7001 20.2933C17.7067 19.0267 18.7267 18 20.0001 18C21.2667 18 22.2934 19.0267 22.2934 20.2933C22.2867 21.5333 21.3134 22.54 20.0801 22.58Z"
      fill="#1659E6"
    />
    <path
      d="M17.9133 23.96C16.9067 24.6333 16.9067 25.74 17.9133 26.4067C19.06 27.1733 20.94 27.1733 22.0867 26.4067C23.0933 25.7333 23.0933 24.6267 22.0867 23.96C20.9467 23.1933 19.0667 23.1933 17.9133 23.96Z"
      fill="#1659E6"
    />
  </svg>
);

export const CalendarDaysSVGIcon = ({
  size = 16,
  ...restProps
}: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M5.33337 1.33334V3.33334"
      stroke="#1659E6"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6666 1.33334V3.33334"
      stroke="#1659E6"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.33337 6.06H13.6667"
      stroke="#1659E6"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 5.66668V11.3333C14 13.3333 13 14.6667 10.6667 14.6667H5.33333C3 14.6667 2 13.3333 2 11.3333V5.66668C2 3.66668 3 2.33334 5.33333 2.33334H10.6667C13 2.33334 14 3.66668 14 5.66668Z"
      stroke="#1659E6"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99703 9.13335H8.00302"
      stroke="#1659E6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5295 9.13335H5.53549"
      stroke="#1659E6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5295 11.1334H5.53549"
      stroke="#1659E6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExportSVGIcon = ({ size = 16, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M12.0467 9.62L8.00004 13.6667L3.95337 9.62"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2.33334V13.5533"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NoDataSVGIcon = ({ size = 40, ...restProps }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0162 4.17041C21.1789 4.17041 22.2968 4.42148 23.109 4.87646L23.1129 4.87939L32.1461 9.87939L32.152 9.88232C32.6265 10.1399 33.1001 10.5334 33.5348 11.0103C33.843 11.3771 33.755 12.0262 33.2653 12.312L20.4323 19.7456H20.4313C20.1793 19.8919 19.8474 19.8996 19.5651 19.7437L6.73401 12.312C6.24446 12.0258 6.16304 11.3857 6.48792 11.022L6.4928 11.0171C6.91926 10.5318 7.39363 10.1467 7.88049 9.88232L7.88733 9.87939L16.9205 4.87939L16.9244 4.87646C17.7365 4.42157 18.8537 4.17047 20.0162 4.17041Z"
      fill="#808080"
      stroke="#808080"
      strokeWidth="1.66667"
    />
    <path
      d="M4.54968 16.6167C4.54968 15.9108 5.26417 15.5259 5.81433 15.8374H5.81531L17.7694 22.771H17.7704C18.0408 22.9423 18.2167 23.2494 18.2167 23.5669V34.9331C18.2167 35.6106 17.5545 36.0028 16.9989 35.7349H16.9999C15.2966 34.8998 13.0029 33.6971 11.1288 32.6997C10.1931 32.2017 9.36413 31.7561 8.76941 31.4351C8.47221 31.2746 8.23354 31.1453 8.06921 31.0562C7.98716 31.0116 7.92372 30.977 7.88074 30.9536C7.85941 30.942 7.84286 30.9332 7.83191 30.9272C7.82989 30.9261 7.8277 30.9252 7.82605 30.9243H7.82703C6.97309 30.4413 6.14398 29.5543 5.52625 28.48C4.90925 27.4068 4.54968 26.2282 4.54968 25.2163V16.6167Z"
      fill="#808080"
      stroke="#808080"
      strokeWidth="1.66667"
    />
    <path
      d="M20.95 23.5666V34.9333C20.95 36.2 22.2333 37.0333 23.3666 36.4833C26.8 34.8 32.5833 31.65 32.5833 31.65C34.6166 30.5 36.2833 27.6 36.2833 25.2166V16.6166C36.2833 15.3 34.9 14.4666 33.7666 15.1166L21.7833 22.0666C21.2833 22.3833 20.95 22.95 20.95 23.5666Z"
      fill="#808080"
    />
  </svg>
);

export const FooterSupportSVGIcon = ({
  size = 42,
  ...restProps
}: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 42 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M0 23C0 11.9543 8.95431 3 20 3C31.0457 3 40 11.9543 40 23C40 34.0457 31.0457 43 20 43C8.95431 43 0 34.0457 0 23Z"
      fill="#1659E6"
    />
    <g clipPath="url(#clip0_1_3955)">
      <path
        d="M25.137 24.3524C25.1398 24.804 24.8577 25.2085 24.4329 25.3619L20.9474 26.6499L19.6635 30.1381C19.3774 30.9152 18.3573 31.0913 17.8273 30.455C17.7487 30.3606 17.6868 30.2534 17.6444 30.1381L16.3523 26.6499L12.8641 25.366C12.087 25.0799 11.9109 24.0598 12.5473 23.5298C12.6417 23.4512 12.7488 23.3893 12.8641 23.3469L16.3523 22.0548L17.6362 18.5666C17.9223 17.7895 18.9424 17.6134 19.4724 18.2498C19.5511 18.3442 19.6129 18.4513 19.6554 18.5666L20.9474 22.0548L24.4356 23.3387C24.8608 23.4936 25.1419 23.8999 25.137 24.3524ZM21.3528 17.8652H22.434V18.9464C22.434 19.3626 22.8845 19.6227 23.2449 19.4146C23.4122 19.318 23.5152 19.1395 23.5152 18.9464V17.8652H24.5964C25.0126 17.8652 25.2727 17.4147 25.0646 17.0543C24.968 16.8871 24.7895 16.784 24.5964 16.784H23.5152V15.7028C23.5152 15.2867 23.0647 15.0266 22.7043 15.2347C22.5371 15.3312 22.434 15.5097 22.434 15.7028V16.784H21.3528C20.9367 16.784 20.6766 17.2345 20.8847 17.5949C20.9812 17.7622 21.1597 17.8652 21.3528 17.8652ZM27.2994 20.0276H26.7588V19.487C26.7588 19.0709 26.3083 18.8108 25.9479 19.0188C25.7806 19.1154 25.6776 19.2939 25.6776 19.487V20.0276H25.137C24.7209 20.0276 24.4608 20.4781 24.6688 20.8385C24.7654 21.0057 24.9439 21.1088 25.137 21.1088H25.6776V21.6494C25.6776 22.0655 26.1281 22.3256 26.4885 22.1176C26.6558 22.021 26.7588 21.8425 26.7588 21.6494V21.1088H27.2994C27.7155 21.1088 27.9756 20.6583 27.7676 20.2979C27.671 20.1306 27.4925 20.0276 27.2994 20.0276Z"
        fill="white"
      />
    </g>
    <rect x="26.5" y="0.5" width={15} height={15} rx="7.5" fill="#E43A39" />
    <rect x="26.5" y="0.5" width={15} height={15} rx="7.5" stroke="white" />
    <path
      d="M34.7884 5.18182V11H34.0838V5.92045H34.0497L32.6293 6.86364V6.14773L34.0838 5.18182H34.7884Z"
      fill="white"
    />
    <defs>
      <clipPath id="clip0_1_3955">
        <rect
          width={16}
          height={16}
          fill="white"
          transform="translate(12 15)"
        />
      </clipPath>
    </defs>
  </svg>
);
