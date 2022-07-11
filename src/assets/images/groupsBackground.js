import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const GroupBackground = (props) => {
  const windowWidth = wp(101);
  const windowHeight= hp(44);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={windowWidth}
      height="302.41"
      viewBox={`0 0 ${windowWidth} 302.41`}
    >
      <Path
        id="Path_38798"
        data-name="Path 38798"
        d={`M${windowWidth} -.789v239.9s-99.25-33.7-193-16.572S0,301.621,0,301.621V-.789Z`}
        transform="translate(0 0.789)"
        fill={props.color}
      />
    </Svg>
  );
};

export default GroupBackground;
