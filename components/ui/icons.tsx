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
