import { StyleSheet, View } from "react-native"
import React from "react"
import { UserInfo } from "../atoms/UserInfo"
import { Qualification } from "../atoms/Qualification"



export const CommentHeader = () => {
    return(
        <View style={styles.container}>
            <UserInfo username={'usuario'}></UserInfo>
            <Qualification rating={3}></Qualification>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})