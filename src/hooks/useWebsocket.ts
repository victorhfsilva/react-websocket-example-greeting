import { useState } from 'react';
import { Client, StompSubscription, Message } from '@stomp/stompjs';

export const useWebSocket = () => {
    const [message, setMessage] = useState('');

    const getClient = async () : Promise<Client> => {
        return await new Promise<Client>((resolve, reject) => {
            const client = new Client({
                brokerURL: 'ws://localhost:8080/websocket-endpoint'
            });

            client.onConnect = () => {
                console.log(`Connected.`);
                resolve(client);
            };

            client.onStompError = frame => {
                reject(new Error(frame.body));
                console.error('Broker error: ' + frame.body);
            };

            client.activate();
        });
    };

    const subscribe = (client: Client, topic: string): StompSubscription => {
        return client.subscribe(`/topic/${topic}`, (message: Message) => {
            setMessage(message.body);
            console.log(`Received message: ${message.body}`);
        });
    };

    const unsubscribe = (subscription: StompSubscription) => {
        subscription.unsubscribe();
    };

    const publish = (client: Client, destination: string, body: string) => {
        client.publish({
            destination: `/app/${destination}`,
            body: body
        });
    };

    return {
        message,
        getClient,
        subscribe,
        unsubscribe,
        publish
    };
};