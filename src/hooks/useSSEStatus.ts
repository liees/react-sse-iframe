import { useState, useEffect } from 'react';
import { messageHub } from '../services';

export const useSSEStatus = () => {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error' | 'disconnected'>(
        messageHub['getStatus'] ? 'idle' : 'idle'
    );

    useEffect(() => {
        return messageHub.subscribeStatus(setStatus);
    }, []);

    return { status };
};
