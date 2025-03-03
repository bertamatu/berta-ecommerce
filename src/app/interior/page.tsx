import { ROUTES } from '../Constants';
import CategoryGrid from '@/components/CategoryGrid';

const InteriorPage = () => (
  <CategoryGrid
    title="Interior Collection"
    categories={ROUTES.INTERIOR.categories}
    mainCategory="Interior"
  />
);

export default InteriorPage;
