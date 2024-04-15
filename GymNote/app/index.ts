import { supabase } from "utils/initSupabase";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          router.replace("/(tabs)/home/Home");
        } else {
          console.log("No supabase user");
          router.replace("/(auth)/login");
        }
      });
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          router.replace("/(tabs)/home/Home");
        } else {
          console.log("No supabase user");
          router.replace("/(auth)/login");
        }
      });
    }, 1500);
  }, []);
}
