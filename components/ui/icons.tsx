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
