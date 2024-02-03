import { useMemo, useState } from 'react';
import { Masonry } from '@/components/masonry';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/mode-toggle';

export const Bookmarks = () => {
  const [list, setList] = useState([
    1, 4, 34, 3, 6, 14, 26, 10, 3, 6, 14, 3, 6, 24, 24, 3, 6, 3, 6, 5, 10, 9, 8,
  ]); // -- mock

  const options = useMemo(
    () => ({
      columns: 8,
      margin: { x: 15, y: 15 },
      breakAt: Object.fromEntries(
        // 8K: 7680px
        Array.from({ length: Math.floor(7680 / 240) }, (_, i) => [
          (i + 1) * 240,
          Math.max(1, i),
        ]),
      ),
      useContainerForBreakpoints: true,
    }),
    [],
  );

  return (
    <main className="h-full w-full p-2 flex-1 overflow-y-auto bg-secondary">
      {/* Mock */}
      <div className="p-6 mx-2 my-4 flex flex-col gap-2 z-20 right-5 fixed bg-purple-300/30 backdrop-blur-[1px]">
        <span>Debug Options</span>
        <ModeToggle />
        <Button
          onClick={() =>
            setList([Math.floor(Math.random() * (Math.floor(40) - 1) + 1), ...list])
          }
        >
          +Prepend
        </Button>
        <Button
          onClick={() =>
            setList([...list, Math.floor(Math.random() * (Math.floor(40) - 1) + 1)])
          }
        >
          Append+
        </Button>
        <Button
          onClick={() => {
            list.shift();
            setList([...list]);
          }}
        >
          -Shift
        </Button>
        <Button
          onClick={() => {
            list.pop();
            setList([...list]);
          }}
        >
          Pop-
        </Button>
      </div>
      <Masonry options={options}>
        {list.map((item, index) => {
          return (
            <Card
              key={index}
              className="p-2 bg-background/60 transition-all ease-in-out duration-300"
            >
              <div>Folder Name-{index}</div>
              <div>
                {/* Mock */}
                {Array.from(Array(item), (_, i) => (
                  <div key={`${index}-${item}-${i}`}>{`${item}-${i}`}</div>
                ))}
              </div>
              <div>
                {Array(item).length} bookmark{Array(item).length === 1 ? '' : 's'}
              </div>
            </Card>
          );
        })}
      </Masonry>
    </main>
  );
};
