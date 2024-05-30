import { useState } from 'react';
import { useWebSocket } from '../hooks/useWebsocket';
import { Client, StompSubscription } from '@stomp/stompjs';

const WebSocketComponent = () => {
    const { message, getClient, subscribe, unsubscribe, publish } = useWebSocket();
    const [client, setClient] = useState<Client | null>(null);
    const [subscription, setSubscription] = useState<StompSubscription | null>(null);

    const handleSubscribe = async () => {
        const client = await getClient();
        setClient(client);
        const subscription = subscribe(client, 'greeting');
        setSubscription(subscription);     
    };

    const handleUnsubscribe = () => {
        if (subscription) {
            unsubscribe(subscription);
        }
    };

    const handleSendMessage = () => {
        if (client) {
            publish(client, 'hello', 'Victor');
        }
    };

    return (
        <div>
            <button onClick={handleSubscribe}>Subscribe</button>
            <button onClick={handleUnsubscribe}>Unsubscribe</button>
            <button onClick={handleSendMessage}>Send Message</button>
            <div>
                <h3>Messages:</h3>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default WebSocketComponent;