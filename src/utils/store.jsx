import { create } from "zustand";

const useStore = create((set) => ({
    tracks: [],
    setTracks: (_tracks) =>
        set(() => ({
            tracks: _tracks,
        })),
}));

export default useStore;