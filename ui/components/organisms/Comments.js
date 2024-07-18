import { useState } from "react";
import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CommentCard } from "../molecules/CommentCard";
import { COLOR } from "../../styles/Theme";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../../Navigation/Routes";



// Componente para mostrar los comentarios
export const Comments = ({ comments, movieId }) => {
  const navigation = useNavigation();
    
    const handleAddComment = () => {
      navigation.navigate(Routes.NewCommmentScreen, {movieId: movieId}, );
    };
  
    return (
      <View style={{flex: 1}}>
        {comments.length == 0 ? 
        <View style={styles.noCommentsContainer}>
          <Text style={styles.noCommentsText}>No hay comentarios aun. Se el primero!</Text>
      </View>
        :
          <FlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent = {<View style={{height: 40}}></View>}
            renderItem={({ item }) => (
                <CommentCard comment={item}></CommentCard>
            )}
          />
        }
        <Pressable style={styles.commentButtton} onPress={handleAddComment}>
          <Text>Agrega tu comentario...</Text>
        </Pressable>

      </View>
    );
  };

// Estilos
const styles = StyleSheet.create({
    commentButtton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: COLOR.second,
        borderRadius: 5,
        width: '100%',
        height: '17%',
        marginBottom: 5,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10
    },
    noCommentsContainer: {
      flex: 1, 
      justifyContent: "space-evenly",
      alignContent: 'center',
      marginBottom: 50
    },
    noCommentsText: {
      alignSelf: 'center',
      fontSize: 20,
      color: COLOR.second,
      fontWeight: 'bold',
      fontFamily: 'roboto',
      paddingTop: 10
    }
  });