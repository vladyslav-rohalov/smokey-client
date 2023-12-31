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

export default function FlavorFilter({ items }) {
  const [searchedFlavor, setSearchedFlavor] = useState('');
  const [debouncedFlavor] = useDebounce(searchedFlavor, 500);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(Array.from(searchParams.entries()));

  const { flavor } = useFilters();
  const dispatch = useDispatch();

  const flavorCountsArr = Object.entries(items).map(([flavor, count]) => ({
    flavor,
    count,
  }));

  const flavorsWithLetter = addAlphabetIndex(flavorCountsArr, 'flavor');
  const filtredFlavors = filterByInput(
    flavorsWithLetter,
    debouncedFlavor,
    'flavor'
  );

  const handleChecked = (checked, curentFlavor) => {
    const filter = { filterName: 'flavor', filterValue: curentFlavor };

    if (checked) {
      dispatch(addFilter(filter));
    } else {
      const flavorParams = queryParams.get('flavor');
      const flavorParamsArr = flavorParams ? flavorParams.split(',') : [];

      if (flavorParamsArr.length > 1) {
        const newFlavorParams = flavorParamsArr
          .filter(flavor => flavor !== curentFlavor)
          .join(',');
        queryParams.set('flavor', newFlavorParams);
      } else {
        queryParams.delete('flavor');
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
    <AccordionCommon title="Flavors">
      <Typography component="h3" sx={visuallyHidden}>
        Search by flavor
      </Typography>
      <Form component="form">
        <Box sx={{ pl: 2 }}>
          <TextField
            id="outlined"
            label="Flavor name"
            type="search"
            size="small"
            value={searchedFlavor}
            onChange={e => setSearchedFlavor(e.target.value)}
          />
        </Box>

        <ContainerFilter component="ul">
          {items &&
            filtredFlavors.map(item => {
              return (
                <Box key={item.flavor} component="li">
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
                            {item.flavor}
                          </Typography>
                        </Counter>
                      </Row>
                    }
                    control={
                      <Checkbox
                        value={flavor}
                        checked={flavor.includes(item.flavor.toLowerCase())}
                        sx={{ p: 1 }}
                        size="small"
                        onChange={(e, checked) => {
                          handleChecked(checked, item.flavor.toLowerCase());
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
