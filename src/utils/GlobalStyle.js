import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    CustomFontBig: {
        fontFamily: 'AbrilFatface-Regular'
    },
    CustomFontHW: {
        fontFamily: Platform.OS === 'ios' ? 'IndieFlower' : 'IndieFlower-Regular'
    },
});