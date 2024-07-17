import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { COLOR } from "../../styles/Theme"
import { Qualification } from "../atoms/Qualification"
import { CommentHeader } from "./CommentHeader"
import { Comment } from "../../screens/Details"

interface Props {
    comment: Comment,
}


export const CommentCard = (props : Props) => {

    return(
        <View style={styles.container}>
         
            {/* Card */}
            <View style={styles.card}>
             
                {/* Header */}
                <View style={styles.header}>
                    
                </View>
                <CommentHeader qualification={props.comment.qualification} userID={props.comment.userID}></CommentHeader>
                 
                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.text}>
                        {props.comment.message}
                    </Text>
                </View>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor : COLOR.primary,
        borderRadius: 15,
        padding: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        margin: 5,
    },
    header : {

    },
    title: {

    },
    subtitle: {

    },
    content: {

    },
    text: {
        fontSize: 14
    }
})
