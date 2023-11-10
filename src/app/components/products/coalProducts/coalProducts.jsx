'use client';

import { useGetCoalsQuery } from '@/app/redux/services/products';
import { useFilters } from '@/app/hooks/useFilters';
import CommonProducts from '../commonProducts/commonProducts';

export default function CoalProducts() {
  const { brand, price, status, weight, size, page, limit } = useFilters();
  const params = {};
  if (brand.length) {
    params.brand = brand.join(',');
  }
  if (price.length) {
    const [min, max] = price[0].split('-');
    params.min = min;
    params.max = max;
  }

  if (status.length) {
    params.status = status.join(',');
  }
  if (weight.length) {
    params.weight = weight.join(',');
  }
  if (size.length) {
    params.size = size.join(',');
  }
  (params.page = page), (params.limit = limit);

  const { data = [], isLoading } = useGetCoalsQuery(params);

  return (
    <>
      {!isLoading && (
        <CommonProducts
          data={data}
          isLoading={isLoading}
          title="Large variety of hookah coals"
        />
      )}
    </>
  );
}
