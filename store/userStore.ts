import { create } from 'zustand'
import { IUser } from '../src/types/index'

type Store = {
    loadUser: boolean
    setLoadUser: (loadUser: boolean) => void
    user: IUser
    setUser: (user: IUser) => void
}

const useUserStore = create<Store>()((set) => ({
    loadUser: true,
    setLoadUser: (loadUser) => set({ loadUser }),
    user: {} as IUser,
    setUser: (user) => set({ user }),
}))


export default useUserStore