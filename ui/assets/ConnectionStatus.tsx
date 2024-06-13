import NetInfo from '@react-native-community/netinfo';

const ConnectionStatus = async () => {
    let status = await NetInfo.fetch()
    return status.isConnected;
}

export default ConnectionStatus