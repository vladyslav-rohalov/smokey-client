import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '@/app/redux/filters/slice';
import { useFilters } from '@/app/hooks/useFilters';
import AccordionCommon from '../accordion/accordionCommon';
import { addAlphabetIndex, filterByInput } from '@/app/lib/functions';
import { Box, TextField, Checkbox, Typography } from '@mui/material';
import { Counter } from '@/app/lib/commonStyles';
import { Form, Label, ContainerFilter, Row } from '@/app/lib/commonStyles';
import { visuallyHidden } from '@mui/utils';

export default function BrandFilter({ items }) {
  const [searchedBrand, setSearchedBrand] = useState('');
  const [debouncedBrand] = useDebounce(searchedBrand, 500);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(Array.from(searchParams.entries()));

  const { brand } = useFilters();

  const dispatch = useDispatch();

  const brandCountsArr = Object.entries(items).map(([brand, count]) => ({
    brand,
    count,
  }));

  const brandsWithLetter = addAlphabetIndex(brandCountsArr, 'brand');

  const filtredBrands = filterByInput(
    brandsWithLetter,
    debouncedBrand,
    'brand'
  );

  const handleChecked = (checked, curentBrand) => {
    const filter = { filterName: 'brand', filterValue: curentBrand };

    if (checked) {
      dispatch(addFilter(filter));
    } else {
      const brandParams = queryParams.get('brand');
      const brandParamsArr = brandParams ? brandParams.split(',') : [];

      if (brandParamsArr.length > 1) {
        const newBrandParams = brandParamsArr
          .filter(brand => brand !== curentBrand)
          .join(',');
        queryParams.set('brand', newBrandParams);
      } else {
        queryParams.delete('brand');
      }

      const search = decodeURIComponent(queryParams.toString());
      const query = search ? `?${search}` : '';
      router.push(`${pathname}${query}`, { scroll: false });

      setTimeout(() => {
        dispatch(removeFilter(filter));
      }, 500);
    }
  };

  return (
    <AccordionCommon title="Brand">
      <Typography component="h3" sx={visuallyHidden}>
        Search by brand
      </Typography>
      <Form component="form">
        <Box sx={{ pl: 2 }}>
          <TextField
            id="outlined"
            label="Brand name"
            type="search"
            size="small"
            value={searchedBrand}
            onChange={e => setSearchedBrand(e.target.value)}
          />
        </Box>

        <ContainerFilter component="ul">
          {items &&
            filtredBrands.map(item => {
              return (
                <Box key={item.brand} component="li">
                  {item.letter && (
                    <Typography sx={{ fontWeight: 500, color: 'primary.dim' }}>
                      {item.letter}
                    </Typography>
                  )}
                  <Label
                    label={
                      <Row>
                        <Counter badgeContent={item.count}>
                          <Typography sx={{ color: 'primary.dim' }}>
                            {item.brand}
                          </Typography>
                        </Counter>
                      </Row>
                    }
                    control={
                      <Checkbox
                        value={item.brand}
                        checked={brand.includes(item.brand.toLowerCase())}
                        sx={{ p: 1 }}
                        size="small"
                        onChange={(e, checked) => {
                          handleChecked(checked, item.brand.toLowerCase());
                        }}
                      />
                    }
                  />
                </Box>
              );
            })}
        </ContainerFilter>
      </Form>
    </AccordionCommon>
  );
}
