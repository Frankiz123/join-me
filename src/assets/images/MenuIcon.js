import React from 'react';
import Svg, { Path, G, Line } from 'react-native-svg';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
const MenuIcon = (props) => {
    const { colors } = useTheme();
    const windowWidth = wp(47);
    const windowHeight = hp(40);
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="21" viewBox="0 0 30 21">
            <G transform="translate(0 0.5)">
                <Line stroke={colors.menu} class="a" x1="30" />
                <Line stroke={colors.menu} class="a" x1="24" transform="translate(6 10)" />
                <Line stroke={colors.menu} class="a" x1="30" transform="translate(0 20)" />
            </G>
        </Svg>
    );
};

export default MenuIcon;
