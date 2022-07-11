import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const HandIcon = (props) => {
  const windowWidth = wp(47);
  const windowHeight = hp(40);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={windowWidth}
      height={windowHeight}
      viewBox="0 0 198.258 267.169"
    >
      <G id="Component_113_2" data-name="Component 113 – 2" transform="translate(0.721 0.622)">
        <Path
          id="Path_44711"
          data-name="Path 44711"
          d="M-13946.854-18889.52s4.462-12.941,9.9-26.742c1.8-4.576,6.151-10.682,7.191-14.641,8.776-12.049-1.543-12.172-3.454-9.262-6.087,9.268-5.472,7.74-8.666,11.691s-10.01,10.223-11.159-2.99c-.459-5.271.3-12.027,0-18.65.015-9.6.544-14.586-1.789-17.791s-8.963-2.465-7.542,4.973.211,29.17.006,31.488-4.279,4.662-5.538-.02c-1.163-4.326-6.183-24.65-9.366-36.74-1.711-11.152-10.269-9.719-10.165-4.895s10.42,37.791,11.013,41.635-2.88,3.469-5.038,1.451-18.4-36.1-22.1-35.967-4.177,2.408-1.982,8.113,16.246,28.584,17.189,31.037,1.173,5.377-2.018,4.162-12.35-10.75-16.928-13.318-7.382,1.678-4.112,5.324,16.517,16.2,21.684,25.578,16.524,28.781,16.524,28.781Z"
          transform="matrix(0.966, -0.259, 0.259, 0.966, 18446.889, 14725.714)"
          fill="#fff"
          stroke="#707070"
          stroke-width="1"
        />
        <Path
          id="Path_44710"
          data-name="Path 44710"
          d="M-13839.248-18802.322c-92.7-78.383-105.3-95.551-105.3-95.551s-20.236,21.734-36.976,20.627,131.077,97.59,139.124,149.885S-13839.248-18802.322-13839.248-18802.322Z"
          transform="translate(14035.311 18981.297)"
          fill="#fec729"
        />
      </G>
    </Svg>
  );
};

export default HandIcon;
