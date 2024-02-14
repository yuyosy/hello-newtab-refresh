import { Bookmarks } from './components/bookmarks';
import { Navigation } from './components/navigation';

const Page = () => {
  return (
    <div className="h-full w-ful flex">
      <Navigation />
      <Bookmarks />
    </div>
  );
};

export default Page;
