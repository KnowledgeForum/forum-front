import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Tag, TagSearch } from "@/types/tag";

import { TagApi } from "@/api/tag";
import { Autocomplete, Chip, CircularProgress, Popper, TextField } from "@mui/material";

type TagSelectProps = {
  initialTags?: Tag[];
  label?: string;
  onSelect: (tags: Tag[]) => void;
};

const TagSelect = ({ label = "태그 (1 ~ 3개)", initialTags, onSelect }: TagSelectProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags || []);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: tags, isLoading } = useQuery<TagSearch>({
    queryKey: ["tags", keyword],
    queryFn: async () => {
      return await TagApi.fetchSearchTags(keyword);
    },
    enabled: !!keyword,
    staleTime: 500,
  });

  const handleChange = useDebouncedCallback(
    useCallback((value: string) => {
      setKeyword(value);
    }, []),
    500,
  );

  const handleTagChange = useCallback(
    (_event: unknown, value: Tag[]) => {
      if (value.length > 3) {
        return;
      }

      setSelectedTags([...value]);
      onSelect([...value]);
    },
    [onSelect],
  );

  const handleDelete = useCallback(
    (tag: Tag) => {
      const newTags = selectedTags.filter((item) => item.tagId !== tag.tagId);

      setSelectedTags(newTags);
      onSelect(newTags);
    },
    [selectedTags, onSelect],
  );

  useEffect(() => {
    if (initialTags) {
      setSelectedTags(initialTags);
    }
  }, [initialTags]);

  return (
    <Autocomplete
      multiple
      open={isOpen && selectedTags.length < 3}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      readOnly={selectedTags.length >= 3}
      limitTags={3}
      noOptionsText="검색을 통해 태그를 추가해주세요."
      clearIcon={false}
      loading={isLoading}
      value={selectedTags}
      onChange={handleTagChange}
      options={tags?.tags || []}
      getOptionLabel={(option) => option.tagName}
      isOptionEqualToValue={(option: Tag, value: Tag) => option.tagId === value.tagId}
      // 가져온 검색 값을 다 보여주기 위함.
      filterOptions={(x) => x}
      /**
       * 잦은 API 호출을 하면 Popper(Tag Dialog)가 깜빡거리고, 왼쪽으로 이동되는 현상이 발생
       * Popper의 width를 reference(Autocomplete)의 width로 고정시켜서 이를 방지
       */
      PopperComponent={(props) => (
        <Popper
          {...props}
          modifiers={[
            {
              name: "setWidth",
              enabled: true,
              phase: "beforeWrite",
              requires: ["computeStyles"],
              fn: ({ state }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
              },
            },
          ]}
          style={{ transform: "none" }}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option: Tag, index: number) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              {...tagProps}
              variant="outlined"
              label={option.tagName}
              key={key}
              onDelete={() => handleDelete(option)}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          autoComplete="off"
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default TagSelect;
