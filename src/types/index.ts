export interface User {
    username: string
    socketId: string
    room: string
}

export interface Shared {
    onlineUsers: User[]
}