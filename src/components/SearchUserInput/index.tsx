import React, {useMemo, useRef, useState} from 'react';
import type {SelectProps} from 'antd';
import {Select, Spin} from 'antd';
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'>
{
    fetchOptions: (search: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}

function DebounceSelect<
    ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>)
{
    const [ fetching, setFetching ] = useState(false);
    const [ options, setOptions ] = useState<ValueType[]>([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() =>
    {
        const loadOptions = (value: string) =>
        {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) =>
            {
                if (fetchId !== fetchRef.current)
                {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [ fetchOptions, debounceTimeout ]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
            options={options}
        />
    );
}

export interface UserValue
{
    label: string;
    value: string;
}

interface SearchUserInputProps
{
    mode?: "multiple" | "tags";
    style?: React.CSSProperties; // Use React.CSSProperties for style objects
    placeholder?: string;
    fetchOptions: (text: string) => Promise<UserValue[]>;
    value: UserValue[];
    setValue: React.Dispatch<React.SetStateAction<UserValue[]>>;
    maxCount: number;
}


export const SearchUserInput: React.FC<SearchUserInputProps> = ({
    value,
    setValue,
    placeholder,
    fetchOptions,
    style,
    mode,
    maxCount
}) =>
{
    return (
        <DebounceSelect
            mode={mode ?? "multiple"}
            value={value}
            placeholder={placeholder ?? "请输入需要查找的用户信息"}
            fetchOptions={fetchOptions}
            onChange={(newValue) =>
            {
                setValue(newValue as UserValue[]);
            }}
            style={style ?? { width: '100%' }}
            maxCount={maxCount}
        />
    );
};


async function fetchUserList(username: string): Promise<UserValue[]>
{
    console.log('fetching user', username);

    return fetch('https://randomuser.me/api/?results=5')
        .then((response) => response.json())
        .then((body) =>
            body.results.map(
                (user: { name: { first: string; last: string }; login: { username: string } }) => ({
                    label: `${user.name.first} ${user.name.last}`,
                    value: user.login.username,
                }),
            ),
        );
}

export const DebounceInput: React.FC = () =>
{
    const [ value, setValue ] = useState<UserValue[]>([]);

    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchUserList}
            onChange={(newValue) =>
            {
                setValue(newValue as UserValue[]);
            }}
            style={{ width: '100%' }}
        />
    );
};

