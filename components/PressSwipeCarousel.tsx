import { useCallback } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
} from 'react-native';

interface PressSwipeCarouselProps {
  data: any[];
}

// press-swipe
import type { ImageSourcePropType } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { AnimatedStyleProp } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

export type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>;

const ImageItems = [
  require('../assets/icon.png'),
  require('../assets/splash.png'),
  // ... 추가 이미지들
];

const PressSwipeCarousel: React.FC<PressSwipeCarouselProps> = ({ data }) => {
  console.log('data!!', data);

  const width = Dimensions.get('window').width;

  // press-swipe
  const pressAnim = useSharedValue<number>(0);
  const animationStyle: TAnimationStyle = useCallback((value: number) => {
    'worklet';

    const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
    const translateX = interpolate(value, [-1, 0, 1], [-width, 0, width]);

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);
  return (
    <View>
      {/* <Text>{code}</Text> */}
      <TouchableOpacity>
        <Carousel
          loop={false}
          autoPlay={true}
          style={{ width: width, height: 240 }}
          width={width}
          data={[...new Array(3).keys()]}
          onScrollBegin={() => {
            pressAnim.value = withTiming(1);
          }}
          onScrollEnd={() => {
            pressAnim.value = withTiming(0);
          }}
          autoPlayInterval={5000}
          renderItem={({ index, item }) => {
            return (
              <CustomItem source={item} key={index} pressAnim={pressAnim} />
            );
          }}
          customAnimation={animationStyle}
          scrollAnimationDuration={1200}
        />
      </TouchableOpacity>
    </View>
  );
};

interface ItemProps {
  pressAnim: Animated.SharedValue<number>;
  source: ImageSourcePropType;
}

const CustomItem: React.FC<ItemProps> = ({ pressAnim, source }) => {
  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressAnim.value, [0, 1], [1, 0.9]);
    const borderRadius = interpolate(pressAnim.value, [0, 1], [0, 30]);

    return {
      transform: [{ scale }],
      borderRadius,
    };
  }, []);

  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, animStyle]}>
      <Animated.Image
        source={ImageItems[1]}
        resizeMode="center"
        style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PressSwipeCarousel;
