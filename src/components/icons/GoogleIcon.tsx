import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface GoogleIconProps {
  size?: number;
  testID?: string;
}

export const GoogleIcon: React.FC<GoogleIconProps> = ({
  size = 24,
  testID = 'google-icon',
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      testID={testID}
    >
      <Path
        d="M12.8125 0.619049H0.539795V12.8095H12.8125V0.619049Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3216 6.84699C12.3216 6.43282 12.2842 6.03455 12.2147 5.65222H6.67615V7.91173H9.84103C9.7047 8.64189 9.29039 9.2605 8.66755 9.67472V11.1403H10.5681C11.6801 10.1234 12.3216 8.62594 12.3216 6.84699Z"
        fill="#4285F4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.67608 12.5555C8.26387 12.5555 9.59505 12.0324 10.568 11.1403L8.66749 9.67465C8.14088 10.0251 7.46731 10.2323 6.67608 10.2323C5.14444 10.2323 3.84799 9.20471 3.38556 7.82404H1.4209V9.33748C2.38855 11.2465 4.37725 12.5555 6.67608 12.5555Z"
        fill="#34A853"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.38557 7.82417C3.26796 7.4737 3.20112 7.09935 3.20112 6.71433C3.20112 6.32937 3.26796 5.95497 3.38557 5.60449V4.09109H1.42091C1.02261 4.87967 0.79541 5.77176 0.79541 6.71433C0.79541 7.65691 1.02261 8.54905 1.42091 9.33762L3.38557 7.82417Z"
        fill="#FBBC05"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.67608 3.19627C7.53947 3.19627 8.31465 3.49097 8.92409 4.06977L10.6108 2.39439C9.59239 1.45186 8.26121 0.873016 6.67608 0.873016C4.37725 0.873016 2.38855 2.18202 1.4209 4.09105L3.38556 5.60444C3.84799 4.22377 5.14445 3.19627 6.67608 3.19627Z"
        fill="#EA4335"
      />
    </Svg>
  );
};
