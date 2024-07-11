import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";

export const useDebouncedRenderNodes = (
  renderNodes: (items: INode[]) => React.ReactNode[],
  data: INode[]
) => {
  const [renderedItems, setRenderedItems] = useState<React.ReactNode[]>([]);

  const debouncedRenderNodes = useMemo(
    () =>
      debounce((items: INode[]) => {
        setRenderedItems(renderNodes(items));
      }, 30),
    [renderNodes]
  );

  useEffect(() => {
    if (data) {
      debouncedRenderNodes(data);
    }
    return () => {
      debouncedRenderNodes.cancel();
    };
  }, [data, debouncedRenderNodes]);

  return renderedItems;
};
