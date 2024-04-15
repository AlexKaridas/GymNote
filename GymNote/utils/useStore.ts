import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface exercise {
  name: string;
  sets: number;
  reps: number;
  weight: string;
  rest: number;
  notes: string;
  completed: boolean;
}

export interface workout {
  title: string;
  exercises: exercise[];
}

export interface StoreProps {
  workouts: workout[];
  setWorkouts: (workouts: workout[]) => void;
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
}

export const useStore = create<StoreProps>()(
  persist(
    (set) => ({
      workouts: [
        {
          title: "Day 1",
          exercises: [
            {
              name: "Bench Press",
              sets: 3,
              reps: 8,
              weight: "",
              rest: 60,
              notes: "This is a note",
              completed: false,
            },
          ],
        },
      ],
      setWorkouts: (workouts) => set({ workouts }),
      userInfo: {},
      setUserInfo: (userInfo) => set({ userInfo }),
      deleteEverything: () =>
        set({
          workouts: [
            {
              title: "Day 1",
              exercises: [
                {
                  name: "Bench Press",
                  sets: 0,
                  reps: 0,
                  weight: "",
                  rest: 0,
                  notes: "This is a note",
                  completed: false,
                },
              ],
            },
          ],
        }),
    }),
    {
      name: "GymNote-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
