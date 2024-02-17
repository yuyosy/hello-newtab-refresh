import { Bookmarks } from './components/bookmarks';
import { Navigation } from './components/navigation';

const Page = () => {
  return (
    <div className="h-full w-full bg-black/5 dark:bg-white/5">
      <Navigation />
      <Bookmarks />
    </div>
  );
};

export default Page;
