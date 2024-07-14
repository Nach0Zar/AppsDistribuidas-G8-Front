import { FlatList, StyleSheet, View } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Comment } from "../../screens/Details"
import { CommentCard } from "../molecules/CommentCard"


interface Props {
    comments : Array<Comment>
}

const renderItem = (comment : any) => (
    <CommentCard comment={comment} />
)


export const Comments = (props : Props) => {
    return(
        <SafeAreaView style={styles.container}>
            <FlatList data={props.comments} renderItem={renderItem}/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})