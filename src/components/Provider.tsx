"use client";
import { store } from "@/state_stores/MobileMenueStore";
import { Provider } from "react-redux";

const Redux_Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Redux_Providers;