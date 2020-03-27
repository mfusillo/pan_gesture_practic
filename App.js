import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Scanda from './assets/scanda.jpg'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'


const {Value, event, cond, eq, add, set, diffClamp} = Animated
const withOffset = (value, state) => {
  const offset = new Value(0)
  return cond(
    eq(state, State.END), 
    [set(offset, add(offset,value)), offset], 
    add(offset, value)
  )
}

export default function App() {

  const state = new Value(0)
  const translationX = new Value(0)
  const translationY = new Value(0)


  const onGestureEvent = event([
    {nativeEvent: {
      state,
      translationX,
      translationY
    }}
  ])
  const translateX = diffClamp(withOffset(translationX, state), -100, 150)
  const translateY = diffClamp(withOffset(translationY, state), -150, 150)

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onGestureEvent}>
        <Animated.View style={{transform: [{translateX}, {translateY}]}}>
          <Image source={Scanda} style={styles.picture}/>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 180
  }
});
