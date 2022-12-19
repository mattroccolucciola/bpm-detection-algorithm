// state
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { SongMetrics } from "./SongInput";

/** # Main */
export class HomeStore {
  // ctor
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  title = "";
  // songMetrics = {[index:string]:string|number} as SongMetrics;
  songMetrics = {} as SongMetrics;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  setSongMetrics(input: SongMetrics) {
    this.songMetrics = input;
  }
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}

// context
export const HomeContext = createContext<HomeStore>(new HomeStore());

// hook
export const useHomeContext: (callerFxn: (stores: HomeStore) => {}) => any = (
  callerFxn: (stores: HomeStore) => any
) => {
  const context = useContext(HomeContext) as HomeStore;

  return callerFxn(context);
};
