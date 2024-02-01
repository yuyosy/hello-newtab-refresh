import { Bookmarks } from './components/bookmarks';
import { Navigation } from './components/navigation';

const Page = () => {
  return (
    <div className="h-full flex">
      <Navigation />
      <main className="h-full w-full p-2 flex-1 overflow-y-auto bg-secondary">
        <Bookmarks />
      </main>
    </div>
  );
};

export default Page;
