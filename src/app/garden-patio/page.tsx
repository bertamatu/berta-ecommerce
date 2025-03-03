import { ROUTES } from '../Constants';
import CategoryGrid from '@/components/CategoryGrid';

const GardenPatioPage = () => (
  <CategoryGrid
    title="Garden & Patio"
    categories={ROUTES.GARDEN.categories}
    mainCategory="Garden"
  />
);

export default GardenPatioPage;
