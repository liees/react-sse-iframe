import { useState, useEffect } from 'react';
import { messageHub } from '../services/MessageHub';
import { SSETSTATUS } from "../types";

export const useSSEStatus = () => {
    const [status, setStatus] = useState<SSETSTATUS>(
        messageHub['getStatus'] ? 'idle' : 'idle'
    );

    useEffect(() => {
        return messageHub.subscribeStatus(setStatus);
    }, []);

    return { status };
};
