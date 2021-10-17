import React, { useRef, memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Icon, Label, Text, Stack } from 'office-ui-fabric-react';
import './index.scss';

interface UIProps {
  id?: string;
  label?: string;
  tags?: string[];
  required?: boolean;
  value?: string;
  onChangeTags?: (tags: string[]) => void;
}

const TagsInputUI = (props: UIProps) => {
  const { id, label, required, value, onChangeTags } = props;

  const tags = useMemo(() => props.tags ?? [], [props.tags]);

  const onChange = (tag: string) => {
    const tmpTags = [...tags, tag];
    onChangeTags && onChangeTags(tmpTags);
  };

  const onRemove = (index: number) => {
    let tmpTags = [...tags];
    tmpTags.splice(index, 1);
    onChangeTags && onChangeTags(tmpTags);
  };

  return (
    <>
      {props.label && <Label required={required}>{label}</Label>}
      <div id={id} className="nate-team-tags-input mx-0 row w-100">
        {tags.length > 0 &&
          tags.map((tag, i) => (
            <span key={'i' + i} className="nate-team-tag-item text-truncate">
              {tag}
              <Icon onClick={() => onRemove(i)} iconName="Cancel" aria-hidden="true" />
            </span>
          ))}
        <NewTagInput onChange={onChange} newTag={value} />
      </div>
    </>
  );
};

type NewTagInputProps = {
  value?: string;
  newTag?: string;
  onChange: Function;
};

const NewTagInput = memo((props: NewTagInputProps) => {
  const [newTag, setNewTag] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const newTagRef = useRef<HTMLSpanElement>(null);

  const handleOutClick = useCallback((evt: MouseEvent) => {
    if (newTagRef.current?.contains(evt.target as Node)) {
      return;
    }
    if (inputRef.current?.value) {
    } else setNewTag(false);
  }, []);

  const onKeyDown = (evt: any) => {
    if (evt.key === 'Enter') {
      inputRef.current?.value &&
        inputRef.current?.value.length <= 20 &&
        props.onChange(inputRef.current?.value.replace(' ', ''));
      setNewTag(false);
      setValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutClick);
    return () => document.removeEventListener('mousedown', handleOutClick);
  }, [handleOutClick]);

  useEffect(() => {
    if (newTag) {
      return inputRef.current?.focus();
    }
  }, [newTag]);

  return (
    <Stack>
      <span className="nate-team-new-tag" ref={newTagRef}>
        {newTag ? (
          <input
            onChange={e => setValue(e.target.value.replace(' ', ''))}
            value={value ?? ''}
            maxLength={20}
            onKeyDown={onKeyDown}
            className="nate-team-new-tag-input"
            ref={inputRef}
          />
        ) : (
          <span onClick={() => setNewTag(true)} className="new-tag-label">
            <Icon iconName="Add" aria-hidden="true" />
            {props.newTag ?? 'NewTag'}
          </span>
        )}
      </span>
      {value?.length > 20 && (
        <Text className="ml-1" variant="smallPlus" style={{ color: 'red' }}>
          Text exceeding 20 characters
        </Text>
      )}
    </Stack>
  );
});

export default TagsInputUI;
