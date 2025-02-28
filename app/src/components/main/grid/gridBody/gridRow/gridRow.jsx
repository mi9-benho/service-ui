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

import React, { Component } from 'react';
import track from 'react-tracking';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { MarkdownViewer } from 'components/main/markdown';
import { LOG_MESSAGE_HIGHLIGHT_TIMEOUT } from '../../constants';
import { columnPropTypes } from '../../propTypes';
import { GridCell } from './gridCell';
import { CheckboxCell } from './checkboxCell';
import styles from './gridRow.scss';

const cx = classNames.bind(styles);
const DESCRIPTION_INITIAL_HEIGHT = 80;

@track()
export class GridRow extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape(columnPropTypes)),
    value: PropTypes.object,
    selectable: PropTypes.bool,
    selectedItems: PropTypes.arrayOf(PropTypes.object),
    onToggleSelection: PropTypes.func,
    onClickRow: PropTypes.func,
    itemIntoViewRef: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.instanceOf(Element), PropTypes.instanceOf(null)]),
    }),
    itemIntoViewId: PropTypes.number,
    changeOnlyMobileLayout: PropTypes.bool,
    rowClassMapper: PropTypes.func,
    tracking: PropTypes.shape({
      trackEvent: PropTypes.func,
      getTrackingData: PropTypes.func,
    }).isRequired,
    eventsInfo: PropTypes.object,
    rowHighlightingConfig: PropTypes.shape({
      onGridRowHighlighted: PropTypes.func,
      isGridRowHighlighted: PropTypes.bool,
      highlightedRowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      highlightErrorRow: PropTypes.bool,
      skipHighlightOnRender: PropTypes.bool,
    }),
    excludeFromSelection: PropTypes.arrayOf(PropTypes.object),
    gridRowClassName: PropTypes.string,
    level: PropTypes.number,
    descriptionConfig: PropTypes.shape({
      colSpan: PropTypes.number,
      className: PropTypes.string,
    }),
  };

  static defaultProps = {
    columns: [],
    value: {},
    selectable: false,
    selectedItems: [],
    onToggleSelection: () => {},
    onClickRow: null,
    changeOnlyMobileLayout: false,
    rowClassMapper: null,
    eventsInfo: {},
    rowHighlightingConfig: {
      onGridRowHighlighted: () => {},
      isGridRowHighlighted: false,
      highlightedRowId: '',
      highlightErrorRow: false,
      skipHighlightOnRender: false,
    },
    excludeFromSelection: [],
    gridRowClassName: '',
    level: 0,
    descriptionConfig: null,
    itemIntoViewRef: null,
    itemIntoViewId: null,
  };

  state = {
    withAccordion: false,
    expanded: false,
    updateHighlight: true,
    highlightBlockStyle: {},
  };

  componentDidMount() {
    this.handleAccordion();
  }

  componentDidUpdate() {
    this.handleAccordion();

    if (
      this.checkIfTheHighlightNeeded() &&
      !this.props.rowHighlightingConfig.skipHighlightOnRender
    ) {
      this.highLightGridRow();
    }
  }

  setupRef = (overflowCell) => {
    this.overflowCell = overflowCell;
  };

  setupAccordion = () => {
    this.setState({ withAccordion: true });
    this.overflowCell.style.maxHeight = `${this.overflowCellMaxHeight}px`;
  };

  getHighlightBlockClasses = () => {
    if (!this.checkIfTheHighlightNeeded()) return '';

    return this.props.rowHighlightingConfig.highlightErrorRow ? 'highlight-error-row' : 'highlight';
  };

  handleRowClick = (e) => this.props.onClickRow(e, this.props.value);

  isItemSelected = () => this.props.selectedItems.some((item) => item.id === this.props.value.id);

  isItemDisabled = () =>
    this.props.excludeFromSelection.some((item) => item.id === this.props.value.id);

  checkIfTheHighlightNeeded = () => {
    const { highlightedRowId, isGridRowHighlighted } = this.props.rowHighlightingConfig;

    return highlightedRowId === this.props.value.id && isGridRowHighlighted;
  };

  rowRef = React.createRef();
  descriptionRef = React.createRef();

  highLightGridRow() {
    this.rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const { onGridRowHighlighted } = this.props.rowHighlightingConfig;
    onGridRowHighlighted &&
      setTimeout(() => {
        onGridRowHighlighted();
      }, LOG_MESSAGE_HIGHLIGHT_TIMEOUT);
  }

  removeAccordion = () => {
    this.setState({ withAccordion: false });
    this.overflowCell.style.maxHeight = null;
  };

  handleAccordion = () => {
    if (!this.overflowCell) {
      return;
    }

    if (
      this.overflowCell.offsetHeight > this.overflowCellMaxHeight ||
      (this.descriptionRef.current &&
        this.descriptionRef.current.offsetHeight > DESCRIPTION_INITIAL_HEIGHT)
    ) {
      !this.state.withAccordion && this.setupAccordion();
    } else if (this.overflowCell.offsetHeight < this.overflowCellMaxHeight) {
      this.state.withAccordion && this.removeAccordion();
    }
  };

  toggleAccordion = () => {
    if (!this.overflowCell) {
      return;
    }

    if (!this.state.expanded) {
      this.props.tracking.trackEvent(this.props.eventsInfo.clickOnExpandAccordion);
    }

    this.setState({ expanded: !this.state.expanded }, () => {
      this.overflowCell.style.maxHeight = !this.state.expanded
        ? `${this.overflowCellMaxHeight}px`
        : null;
    });
  };

  render() {
    const {
      columns,
      value,
      selectable,
      onClickRow,
      changeOnlyMobileLayout,
      rowClassMapper,
      gridRowClassName,
      level,
      descriptionConfig,
      itemIntoViewRef,
      itemIntoViewId,
    } = this.props;

    const { expanded } = this.state;
    const customClasses = (rowClassMapper && rowClassMapper(value)) || {};

    return (
      <div
        className={cx('grid-row-wrapper', {
          selected: this.isItemSelected(),
          ...customClasses,
        })}
        data-id={value.id}
        ref={this.rowRef}
        onClick={onClickRow ? this.handleRowClick : null}
      >
        {this.state.withAccordion && (
          <div className={cx('accordion-wrapper-mobile')}>
            <div
              className={cx('accordion-toggler-mobile', { rotated: this.state.expanded })}
              onClick={this.toggleAccordion}
            />
          </div>
        )}
        <div
          ref={itemIntoViewId === value.id ? itemIntoViewRef : null}
          className={cx(
            'grid-row',
            { 'change-mobile': changeOnlyMobileLayout, [`level-${level}`]: level !== 0 },
            gridRowClassName,
            this.getHighlightBlockClasses(),
          )}
        >
          {columns.map((column, i) => {
            if (column.maxHeight) {
              this.overflowCellMaxHeight = column.maxHeight;
            }
            const cell = (
              <GridCell
                key={column.id || i}
                refFunction={column.maxHeight ? this.setupRef : null}
                mobileWidth={column.mobileWidth}
                value={value}
                id={column.id}
                align={column.align}
                component={column.component}
                formatter={column.formatter}
                title={column.title}
                customProps={column.customProps}
                expanded={expanded}
                toggleExpand={this.toggleAccordion}
                rowSpan={descriptionConfig ? column.rowSpan : null}
              />
            );
            if (level && i === 0) {
              return (
                <div
                  key={column.id || i}
                  className={cx('first-col-wrapper', {
                    'change-mobile': changeOnlyMobileLayout,
                    [`level-${level}`]: level !== 0,
                  })}
                >
                  {cell}
                </div>
              );
            }
            return cell;
          })}
          {selectable && (
            <GridCell
              align={'right'}
              component={CheckboxCell}
              value={value}
              customProps={{
                disabled: this.isItemDisabled(),
                selected: this.isItemSelected(),
                onChange: this.props.onToggleSelection,
              }}
              rowSpan={descriptionConfig ? 2 : null}
            />
          )}
        </div>
        {descriptionConfig && !!value.description ? (
          <tr className={cx('description-row')} ref={this.descriptionRef}>
            <td
              colSpan={descriptionConfig.colSpan}
              className={cx(
                'description-cell',
                this.getHighlightBlockClasses(),
                descriptionConfig.className,
              )}
            >
              <div
                className={cx('description')}
                style={{
                  maxHeight: this.state.expanded
                    ? 'max-content'
                    : `${DESCRIPTION_INITIAL_HEIGHT}px`,
                }}
              >
                <MarkdownViewer value={value.description} />
              </div>
            </td>
          </tr>
        ) : (
          <tr className={cx('description-row')} ref={this.descriptionRef} />
        )}
        {this.state.withAccordion && (
          <div className={cx('grid-row')}>
            <div className={cx('accordion-wrapper', { [`level-${level}`]: level !== 0 })}>
              <div
                className={cx(
                  'accordion-block',
                  { expanded: this.state.expanded },
                  this.getHighlightBlockClasses(),
                )}
              >
                <div
                  className={cx('accordion-toggler', { rotated: this.state.expanded })}
                  onClick={this.toggleAccordion}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
