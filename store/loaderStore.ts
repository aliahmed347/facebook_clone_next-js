import { create } from 'zustand'

type Store = {
    loader: boolean
    text: string
    setLoader: (loading: boolean) => void
    setText: (text: string) => void
    sidebar: boolean
    setSidebar: (sidebar: boolean) => void
}

const useLoaderStore = create<Store>()((set) => ({
    loader: false,
    text: '',
    setLoader: (loader) => set({ loader }),
    setText: (text) => set({ text }),
    sidebar: false,
    setSidebar: (sidebar) => set({ sidebar }),
}))


export default useLoaderStore