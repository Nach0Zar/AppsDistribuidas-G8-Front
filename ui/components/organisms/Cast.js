import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../styles/Theme";

export const Cast = ({ crew ,cast }) => {
    return (
      <ScrollView>
        <Text style={styles.sectionTitle}>Actores</Text>
        <View style={styles.crewContainer}>
            {cast.map(function(d, idx){
            return (<Text style={styles.crewMember} key={idx}>{d.name}</Text>)
            })}
        </View>
        <Text style={styles.sectionTitle}>Director</Text>
        <View style={styles.crewContainer}>
            {crew.map(function(d, idx){
            return (<Text style={styles.crewMember} key={idx}>{d.name}</Text>)
            })}
        </View>
      </ScrollView>
    );
  };

// Estilos
const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#2C2C2C',
      flex: 1
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    details: {
      fontSize: 16,
      color: 'gray',
    },
    rating: {
      fontSize: 16,
      marginVertical: 10,
      color: '#FFD700'
    },
    synopsis: {
      fontSize: 16,
      marginVertical: 10,
      color: '#FFFFFF'
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      color: '#FFFFFF'
    },
    castItem: {
      fontSize: 16,
      marginVertical: 5,
      color: '#FFFFFF'
    },
    commentItem: {
      marginVertical: 10,
      backgroundColor: '#3C3C3C',
      padding: 10,
      borderRadius: 5
    },
    commentUser: {
      fontWeight: 'bold',
      color: '#FFD700'
    },
    commentRating: {
      marginVertical: 5,
      color: '#FFD700'
    },
    input: {
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
      backgroundColor: '#FFFFFF'
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    tab: {
      fontSize: 18,
      color: 'gray',
      paddingBottom: 5,
    },
    activeTab: {
      color: '#FFFFFF',
      borderBottomWidth: 2,
      borderBottomColor: '#FFD700',
    },
    crewContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    crewMember: {
        color: COLOR.second,
        marginRight: 10,
    }
  });