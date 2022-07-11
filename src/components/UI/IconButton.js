import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { getColors } from '../../colors';

const IconButton = (props) => {
  const {
    labelText,
    labelColor,
    source,
    onPress,
    containerStyles,
    imageStyle,
    containerStyle,
  } = props;
  const { label, inputContainer, container, image } = styles;
 
  return (
    <View style={[inputContainer, containerStyles]}>
      {labelText && (
        <Text style={[label, { color: labelColor ? labelColor : getColors('font') }]}>
          {labelText}
        </Text>
      )}

      <Pressable style={[container, containerStyle]} onPress={onPress}>
        {console.log('source',source)}
        <Image
          source={source}
          height={20}
          width={20}
          style={imageStyle !== null ? imageStyle : image}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: hp(2.5),
    textAlign: 'justify',
    marginBottom: 5,
    fontWeight: '500',
    // fontFamily: 'Poppins-Regular',
    marginHorizontal: wp(7),
  },
  container: {
    backgroundColor: getColors('mediumGrey'),
    marginHorizontal: wp(7),
    borderRadius: 10,
    height: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    resizeMode: 'contain',
    height: hp(8),
    borderWidth: 2,
    borderRadius: 29,
  },
});

export default IconButton;
