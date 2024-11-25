import { Box, FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";

type SelectItem = {
  value: string;
  label: string;
};

export type SelectProps = {
  label: string;
  value: string;
  items: SelectItem[];
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const Select = ({ label, value, items, required = false, disabled = false, onChange }: SelectProps) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
        <MuiSelect
          label={label}
          labelId={`select-label-${label}`}
          value={value}
          onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
          required={required}
          disabled={disabled}
        >
          {items.map((item: SelectItem) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
