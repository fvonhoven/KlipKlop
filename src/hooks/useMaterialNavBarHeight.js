import { useSafeAreaInsets } from "react-native-safe-area-context"

export const userMaterialNavBarHeight = withoutBottomTabs => {
  const { bottom, top } = useSafeAreaInsets()
  console.log({ bottom, top })
  return bottom - Math.floor(top) + (withoutBottomTabs ? 0 : 64)
}
