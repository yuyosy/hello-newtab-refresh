import { useMemo, useState } from 'react';
import { Masonry } from '@/components/masonry';
import { Button } from '@/components/ui/button';

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
    <>
      {/* Mock */}
      <div className="flex flex-col gap-2 z-20 right-5 fixed">
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
          Pop-+
        </Button>
      </div>
      <Masonry options={options}>
        {list.map((item, index) => {
          return (
            <div
              className="item bg-white p-4 transition-all ease-in-out duration-300 "
              key={index}
            >
              {/* Mock */}
              {Array.from(Array(item), (_, i) => (
                <div key={`${index}-${item}-${i}`}>{`${item}-${i}`}</div>
              ))}
            </div>
          );
        })}
      </Masonry>
    </>
  );
};
