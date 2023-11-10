import { tmpUser } from '@/app/lib/tmpData';
import ProductsList from '../productsList/productsList';
import Sidebar from '@/app/components/sidebar/sidebar';
import SortFilter from '@/app/components/filters/sortfilter/sortfilter';
import LimitFilter from '@/app/components/filters/limitFilter/limitFilter';
import Sortbar from '../../filters/sortbar/sortbar';
import DrawerFilters from '../../filters/drawerFilters/drawerFilters';
import { Row, RowBetween } from '@/app/lib/commonStyles';
import { useMediaQuery } from '@mui/material';

export default function CommonProducts({ data, title, isLoading }) {
  const { favorites } = tmpUser;
  const isDrawer = useMediaQuery('(max-width:1199px)');

  return (
    <>
      <RowBetween sx={{ mb: 1 }}>
        {isDrawer ? (
          <>
            <DrawerFilters filter={data.counts} />
            <Sortbar mobile={true} total={data?.counts?.total} />
          </>
        ) : (
          <Sortbar total={data?.counts?.total} data={data} />
        )}
        <Row sx={{ gap: 2 }}>
          <LimitFilter />
          <SortFilter />
        </Row>
      </RowBetween>
      <Row>
        <Sidebar filter={data.counts} />
        <ProductsList
          products={data.products}
          favorites={favorites}
          skeleton={12}
          component="h4"
          title={title}
          isLoading={isLoading}
        />
      </Row>
    </>
  );
}