import React, { useEffect, useState } from 'react';
import { Modal, View, Dimensions, Image, Text, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ImageProperties } from '../../models/ImageProperties';
import { COLOR } from '../../styles/Theme';
import { CustomButton } from '../atoms/CustomButton';
import YoutubeIframe from 'react-native-youtube-iframe';

interface CarouselProps {
    images: Array<ImageProperties>,
    videos: Array<String>,
    isVisible: boolean,
    onClose: () => void;
}

interface Media {
    type: String,
    id: String
}

const CustomCarousel = ({images, videos, isVisible, onClose }: CarouselProps) => {
    const [itemsLoaded, setItemsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<Array<Media>>([]);
    const { width, height } = Dimensions.get('window');
    useEffect(()=>{
        if(!itemsLoaded){
            let parsedItems: Array<Media> = [];
            images.forEach((image)=>{
                let parsedImage: Media = {
                    type: "image",
                    id: image.file_path
                }
                parsedItems.push(parsedImage);
            });
            videos.forEach((video)=>{
                let parsedVideo: Media = {
                    type: "video",
                    id: video
                }
                parsedItems.push(parsedVideo);
            });
            setItems(parsedItems);
            setItemsLoaded(true);
        }
    },[items])

    const renderItem = ({item} : { item: any }) => {
        if (item.type === 'image') {
            return (
            <View style={{ padding: 20, backgroundColor: COLOR.secondBackground, borderRadius: 10 }}>
                <Image source={{uri: "https://image.tmdb.org/t/p/original"+item.id}} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
             </View>
            );
        } else{
            return(
                <View style={{ padding: 20, backgroundColor: COLOR.secondBackground, borderRadius: 10 }}>
                    <YoutubeIframe height={200} play={false} videoId={item.id}/>
                </View>
            );
        }
      };

  return (
    <Modal
    animationType='fade'
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <View style={{maxHeight: '90%'}}>    
                <Carousel
                    data={items}
                    renderItem={renderItem}
                    width={width}
                    mode='parallax'
                    windowSize={6}
                    loop/> 
            </View>
            <View>
                <CustomButton
                    title="Cerrar"
                    color={COLOR.black}
                    onPress={() => onClose()}/>
            </View>
        </View>
    </Modal>
  )
};

export default CustomCarousel;