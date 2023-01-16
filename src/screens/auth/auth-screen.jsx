import React from "react"
import { SafeAreaView } from "react-native"
import { AuthMenu, AuthDetails } from "../../components"
import styles from "./styles"

export function AuthScreen() {
  const [authPage, setAuthPage] = React.useState(false)
  const [detailsPage, setDetailsPage] = React.useState(true)
  return (
    <SafeAreaView style={styles.container}>
      {detailsPage ? (
        <AuthDetails authPage={authPage} setDetailsPage={setDetailsPage} />
      ) : (
        <AuthMenu
          authPage={authPage}
          setAuthPage={setAuthPage}
          detailsPage={detailsPage}
          setDetailsPage={setDetailsPage}
        />
      )}
    </SafeAreaView>
  )
}
