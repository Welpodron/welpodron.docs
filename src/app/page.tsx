import { allPosts } from 'contentlayer/generated';
import { getNavTree } from '@/utils/utils';
import { Layout } from '@/components/layout/Layout';

const Home = () => {
  const navTree = getNavTree(allPosts);

  return <Layout {...{ navTree }} />;
};

export default Home;
