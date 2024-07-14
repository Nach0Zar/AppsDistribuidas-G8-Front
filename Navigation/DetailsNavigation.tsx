import * as React from 'react';
import {Image, ScrollView, Text, View, useWindowDimensions} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {COLOR} from '../ui/styles/Theme';
import { CommentCard } from '../ui/components/molecules/CommentCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Comments } from '../ui/components/organisms/Comments';
import { Comment } from '../ui/screens/Details';

interface Props {
  comments : Array<Comment>
}


const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = (props : Props) => (
  <ScrollView style={{flex: 1, backgroundColor: 'yellow'}}>
    <Comments comments={props.comments}></Comments>
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export const TabViewExample = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Reparto'},
    {key: 'second', title: 'Comentarios'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: COLOR.primary}}
          style={{backgroundColor: COLOR.primaryBackground, borderColor: 'red'}}
          renderLabel={({route}) => (<Text style={{color: COLOR.second, fontWeight: 'bold' }}>
            {route.title}
          </Text>)}
        />
      )} // <-- add this line
    />
  );
};
