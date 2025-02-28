/*
 * Copyright 2019 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {
  formatAttribute,
  formatAttributeWithSpacedDivider,
  notSystemAttributePredicate,
} from 'common/utils/attributeUtils';
import styles from './attributesBlock.scss';

const cx = classNames.bind(styles);

export const AttributesBlock = ({
  attributes,
  onClickAttribute,
  isAttributeClickable,
  noHoverEffects,
}) => (
  <div className={cx('attributes-block')}>
    {attributes.some(notSystemAttributePredicate) && <div className={cx('attributes-icon')} />}
    {attributes.filter(notSystemAttributePredicate).map((attribute) => (
      <div
        key={formatAttribute(attribute)}
        className={cx('attribute', {
          cursor: isAttributeClickable,
          'no-hover-effects': noHoverEffects,
        })}
        onClick={isAttributeClickable ? () => onClickAttribute(attribute) : null}
        title={formatAttributeWithSpacedDivider(attribute)}
      >
        {attribute.key ? (
          <>
            <div className={cx('key')}>{attribute.key}</div>
            <div>:</div>
            <div className={cx('value')}>{attribute.value}</div>
          </>
        ) : (
          <div>{attribute.value}</div>
        )}
      </div>
    ))}
  </div>
);

AttributesBlock.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      system: PropTypes.bool,
    }),
  ).isRequired,
  onClickAttribute: PropTypes.func,
  isAttributeClickable: PropTypes.bool,
  noHoverEffects: PropTypes.bool,
};
AttributesBlock.defaultProps = {
  onClickAttribute: () => {},
  isAttributeClickable: false,
  noHoverEffects: false,
};
