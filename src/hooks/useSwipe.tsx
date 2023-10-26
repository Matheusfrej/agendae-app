import { Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width

interface UseSwipeProps {
  onSwipeLeft?: any
  onSwipeRight?: any
  rangeOffset: number
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  rangeOffset = 4,
}: UseSwipeProps) {
  let firstTouch = 0

  // set user touch start position
  function onTouchStart(e: any) {
    firstTouch = e.nativeEvent.pageX
  }

  // when touch ends check for swipe directions
  function onTouchEnd(e: any) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX
    const range = windowWidth / rangeOffset

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range && onSwipeRight !== undefined) {
      onSwipeRight()
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range && onSwipeLeft !== undefined) {
      onSwipeLeft()
    }
  }

  return { onTouchStart, onTouchEnd }
}
