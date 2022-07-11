import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ButtonApp from '../../components/UI/ButtonApp';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/UI/CustomText';

const Confirmation = (props) => {
  const { colors } = useTheme();
  const { container, headText, headText1, buttonContainer } = styles(colors);
  const {  navigation, eventId,route  } =  props;
const id = eventId || route.params.eventId
  return (
    <View style={container}>
      <CustomText variant="bold" style={headText}>
      {route.params?.update !== undefined ?  getString('createActivity.Update.Title'):
        getString('createActivity.Confirmation.Title')}
      </CustomText>
     <CustomText variant="bold" style={headText1}>
     {route.params?.update !==undefined ?  getString('createActivity.Update.body'):  getString('createActivity.Confirmation.body')}
      </CustomText>

      <View style={buttonContainer}>
        <ButtonApp
          buttonTitle={getString('createActivity.Confirmation.btnViewEvent')}
          onPress={() => navigation.navigate('ActivityDetail', { moveid: 10, others: 10, eventId:id })}
          btnBackground={colors.btnBackground}
        />
      </View>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundApp,
    },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'center',
      padding: 20,
      marginTop: hp('7%'),
      // width: wp(35),
    },

    headText: {
      color: colors.whiteYellow,
      fontSize: hp(8),
      // fontWeight: 'bold',
    },
    headText1: {
      color: colors.font,
      fontSize: hp(5),
      textAlign: 'center',
      paddingHorizontal: hp(2),

      // fontWeight: 'bold',
    },
  });

  Confirmation.propTypes = {
    eventId: PropTypes.any.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    eventId: state.activity.eventId,
   
  });
  
  export default connect(mapStateToProps, {  })(Confirmation);