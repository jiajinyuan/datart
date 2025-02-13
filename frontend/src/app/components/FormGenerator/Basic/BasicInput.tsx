/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Input } from 'antd';
import { ChartStyleSectionConfig } from 'app/types/ChartConfig';
import debounce from 'lodash/debounce';
import { FC, memo, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { ItemLayoutProps } from '../types';
import { itemLayoutComparer } from '../utils';
import { BW } from './components/BasicWrapper';

const BasicInput: FC<ItemLayoutProps<ChartStyleSectionConfig>> = memo(
  ({ ancestors, translate: t = title => title, data, onChange }) => {
    const [cache, setCache] = useState(data);
    const { comType, options, ...rest } = cache;

    const debouncedDataChange = useMemo(
      () =>
        debounce(value => {
          onChange?.(ancestors, value, options?.needRefresh);
        }, 500),
      [ancestors, onChange, options?.needRefresh],
    );
    return (
      <Wrapper label={t(cache.label)}>
        <Input
          {...rest}
          {...options}
          onChange={value => {
            const newCache = Object.assign({}, cache, {
              value: value.target?.value,
            });
            setCache(newCache);
            debouncedDataChange(newCache.value);
          }}
        />
      </Wrapper>
    );
  },
  itemLayoutComparer,
);

export default BasicInput;

const Wrapper = styled(BW)`
  .ant-input {
    color: ${p => p.theme.textColorSnd};
    background-color: ${p => p.theme.emphasisBackground};
    border-color: ${p => p.theme.emphasisBackground};
    box-shadow: none;
  }
`;
