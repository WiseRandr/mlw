import React, { PropsWithChildren, ReactElement, useCallback, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

export default function SwipeModule({ children, rightContent, onPress }: PropsWithChildren<{ rightContent: ReactElement, onPress: () => void }>) {
  const renderRightActions = (progress: any, dragX: any) => {
    return <RectButton onPress={onPress}>
      <Animated.View style={{ flex: 1 }}>
        {rightContent}
      </Animated.View>
    </RectButton>
  };

  return <Swipeable renderRightActions={renderRightActions}>
      {children}
  </Swipeable>
}
