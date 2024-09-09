import { create } from 'zustand'
import { IGroup, IUser } from '../src/types/index'

type Store = {
    loadUser: boolean
    setLoadUser: (loadUser: boolean) => void
    groups: IGroup[]
    setGroups: (groups: IGroup[]) => void
    user: IUser
    setUser: (user: IUser) => void
}

const useUserStore = create<Store>()((set) => ({
    loadUser: true,
    setLoadUser: (loadUser) => set({ loadUser }),
    user: {} as IUser,
    setUser: (user) => set({ user }),
    groups: [] as IGroup[],
    setGroups: (groups) => set({ groups }),
}))


export default useUserStore