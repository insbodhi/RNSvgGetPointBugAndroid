import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';

import {Path, Circle, Svg} from 'react-native-svg';

const CustomPath = ({path, color, strokewidth}) => {
  const ref = useRef(null);
  const [ptt, setptt] = useState({x: 0, y: 0});
  const computepathpoints = () => {
    let point = {x: -10, y: -10};
    if (ref.current) {
      const pathLength = ref.current.getTotalLength();
      // x and y values at a given length on path are scaled down on android devices which I think is incorrect
      point = ref.current.getPointAtLength(pathLength);
      console.log(pathLength, point);
    }
    setptt(point);
    console.log(point);
  };

  const onLayouted = () => {
    computepathpoints();
  };

  console.log(ptt);
  return (
    <>
      <Path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokewidth}
        stroke-linecap="round"
        stroke-linejoin="round"
        onLayout={onLayouted}
        scale={'1'}
        ref={ref}
      />
      <Circle cx={ptt?.x} cy={ptt?.y} r="4" fill={color} />
    </>
  );
};

const App = () => {
  const PATH = 'M 0 50 h 100';

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Svg height="200" width="200" viewBox="0 0 200 200" style={styles.svg}>
        <CustomPath path={PATH} color={'orange'} strokewidth={2} />
      </Svg>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  svg: {
    borderWidth: 1,
    borderColor: 'red',
  },
  backgroundStyle: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
