import FilterCommon from '../accordion/accordionCommon';
import { FormControl, Checkbox, Box } from '@mui/material';
import { FormControlLabel } from '@mui/material';

export default function TypeFilter({ items }) {
  const handleChecked = e => {
    console.log(e.target.checked);
    console.log(e.target.value);
    //need to fetch items
  };

  return (
    <FilterCommon title="Type">
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
        component="form"
      >
        <Box
          component="ul"
          sx={{
            width: '100%',
            listStyle: 'none',
            pl: 2,
          }}
        >
          {items.map(({ id, type }) => {
            return (
              <Box component="li" key={id}>
                <FormControlLabel
                  control={<Checkbox value={type} sx={{ p: 1 }} size="small" />}
                  label={type}
                  onClick={handleChecked}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'primary.dim' },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </FormControl>
    </FilterCommon>
  );
}