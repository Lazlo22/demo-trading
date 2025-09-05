import { type FC, lazy, Suspense, useState } from "react";
import VirtualList from "rc-virtual-list";

import { usePositionsStore } from "@/stores/PositionsStore";
import type { Position } from "@/types/trade";
import PositionRow from "./components/PositionRow";

const ClosePositionDialog = lazy(() => import("@/components/trade/ClosePositionDialog"));

interface PositionsListProps {
  positions: Position[];
}

const PositionsList: FC<PositionsListProps> = ({ positions }) => {
  const removePosition = usePositionsStore((state) => state.removePosition);

  const [confirmPosition, setConfirmPosition] = useState<Position | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const handleClosePositionClick = (position: Position) => {
    setConfirmPosition(position);
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    if (!confirmPosition) return;

    try {
      removePosition(confirmPosition.id);
      setIsConfirmOpen(false);
      setConfirmPosition(null);
    } catch (error) {
      console.error("Failed to close position:", error);
    }
  };

  const handleCancelClose = () => {
    setIsConfirmOpen(false);
    setConfirmPosition(null);
  };

  return (
    <>
      <div className="h-full">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">Size</div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">Entry Price</div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">Mode</div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">PnL</div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">Actions</div>
        </div>
        <div className="overflow-auto">
          <VirtualList fullHeight={false} data={positions} height={400} itemHeight={60} itemKey="id">
            {(position) => <PositionRow position={position} handleClosePositionClick={handleClosePositionClick} />}
          </VirtualList>
        </div>
      </div>
      <Suspense>
        <ClosePositionDialog
          position={confirmPosition}
          isOpen={isConfirmOpen}
          onClose={handleCancelClose}
          onConfirm={handleConfirmClose}
        />
      </Suspense>
    </>
  );
};

PositionsList.displayName = "PositionsList";

export default PositionsList;
