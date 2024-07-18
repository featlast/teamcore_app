export const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          perspective: 1000
        },
        {
          rotateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ["180deg", "0deg"]
          })
        },
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
          })
        }
      ]
    }
  })
};
