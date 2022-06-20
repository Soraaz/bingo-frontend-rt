import React from "react";
import useSession from "./hooks/useSession";
import type { MouseEvent } from "react";
import "./App.css";
import ActionButton from "./components/ActionButton";
import Grid from "./components/Grid";
import { newWords } from "./lib/words";
import emojiGrid from "./lib/emojiGrid";

type ClickHandler<T> = (event: MouseEvent<T>) => void;
type CellClickHandler = ClickHandler<HTMLTableDataCellElement>;
export type ButtonClickHandler = ClickHandler<HTMLButtonElement>;
export type CellData = { word: string; stamped: boolean };
export type CellProps = CellData & { toggleStamped: CellClickHandler };

const App = () => {
  const newCellDataList = function (): CellData[] {
    return newWords().map((word) => {
      return { word: word, stamped: false };
    });
  };

  const [cellDataList, setCellDataList] =
    useSession<CellData[]>(newCellDataList);

  const setStamped = (index: number, stamped: boolean): void => {
    setCellDataList(
      cellDataList.map((cellData, cellDataIndex) => {
        if (index === cellDataIndex) {
          return { ...cellData, stamped: stamped };
        } else {
          return cellData;
        }
      })
    );
  };

  const toggleStampedForIndex = function (
    index: number,
    stamped: boolean
  ): CellClickHandler {
    return () => {
      setStamped(index, !stamped);
    };
  };

  const cellPropsList: CellProps[] = cellDataList.map((cellData, index) => ({
    ...cellData,
    toggleStamped: toggleStampedForIndex(index, cellData.stamped),
  }));

  const setNewWords: ButtonClickHandler = () => {
    setCellDataList(newCellDataList());
  };

  const clearAllCells: ButtonClickHandler = () => {
    setCellDataList(
      cellDataList.map((cellData) => ({ ...cellData, stamped: false }))
    );
  };

  const copyBoardToClipboard: ButtonClickHandler = () => {
    window.navigator.clipboard.writeText(emojiGrid(cellDataList));
  };

  return (
    <div className="App" >
      <header className="App-header">
        <div className="App-actions">
          <ActionButton
            text="Nouvelle carte"
            onClick={setNewWords}
            activeDuration={100}
          />
          <ActionButton
            text="Clear"
            onClick={clearAllCells}
            activeDuration={100}
          />
        </div>
      </header>

      <Grid cellPropsList={cellPropsList} />
    </div>
  );
};

export default App;
