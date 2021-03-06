import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { intlShape, FormattedMessage } from 'react-intl';

import Icon from './Icon';
import LocalTime from './LocalTime';

import ComponentUsageExample from './ComponentUsageExample';
import {
  currentTime as exampleCurrentTime,
  departure as exampleDeparture,
  realtimeDeparture as exampleRealtimeDeparture,
} from './ExampleData';

function DepartureTime(props, context) {
  let shownTime = props.departureTime ? (
    <LocalTime forceUtc={props.useUTC} time={props.departureTime} />
  ) : null;
  let originalTime = null;
  const isLate =
    props.departureDelay >= context.config.itinerary.delayThreshold;

  if (props.displayOriginalTime) {
    originalTime = props.realtime &&
      isLate && [
        <span key="time" className="text-right gray linethrough">
          <LocalTime
            forceUtc={props.useUTC}
            time={props.departureTime - props.departureDelay}
          />{' '}
        </span>,
      ];
  } else {
    const timeDiffInMinutes = Math.floor(
      (props.departureTime - props.currentTime) / 60,
    );
    if (
      timeDiffInMinutes < 0 ||
      timeDiffInMinutes > context.config.minutesToDepartureLimit
    ) {
      shownTime = (
        <LocalTime forceUtc={props.useUTC} time={props.departureTime} />
      );
    } else if (timeDiffInMinutes === 0) {
      shownTime = <FormattedMessage id="arriving-soon" defaultMessage="Now" />;
    } else {
      shownTime = (
        <FormattedMessage
          id="departure-time-in-minutes"
          defaultMessage="{minutes} min"
          values={{ minutes: timeDiffInMinutes }}
        />
      );
    }
  }

  let realtime;
  if (props.realtime && !props.canceled) {
    realtime = (
      <span
        aria-label={context.intl.formatMessage({
          id: 'realtime',
          defaultMessage: 'Real time',
        })}
      >
        <Icon
          img="icon-icon_realtime"
          className={cx('realtime-icon', { late: isLate, realtime: !isLate })}
        />
      </span>
    );
  }
  return (
    <React.Fragment>
      <span
        style={props.style}
        className={cx(
          'time',
          {
            realtime: props.realtime,
            canceled: props.canceled,
            late: isLate,
          },
          props.className,
        )}
      >
        {realtime}
        {originalTime}
        {shownTime}
      </span>
      {props.canceled &&
        props.showCancelationIcon && (
          <Icon className="caution" img="icon-icon_caution" />
        )}
    </React.Fragment>
  );
}

DepartureTime.contextTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  config: PropTypes.shape({
    itinerary: PropTypes.shape({
      delayThreshold: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

DepartureTime.description = () => (
  <div>
    <p>
      Display time in correct format. Displays minutes for 20 minutes, otherwise
      in HH:mm format. Also, it takes into account if the time is realtime. The
      prop useUTC forces rendering in UTC, not local TZ, for testing.
    </p>
    <ComponentUsageExample description="real time">
      <DepartureTime
        departureTime={exampleRealtimeDeparture.stoptime}
        realtime={exampleRealtimeDeparture.realtime}
        currentTime={exampleCurrentTime}
        useUTC
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="not real time">
      <DepartureTime
        departureTime={exampleDeparture.stoptime}
        realtime={exampleDeparture.realtime}
        currentTime={exampleCurrentTime}
        useUTC
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="canceled">
      <DepartureTime
        departureTime={exampleDeparture.stoptime}
        realtime={exampleDeparture.realtime}
        currentTime={exampleCurrentTime}
        canceled
        useUTC
      />
    </ComponentUsageExample>
  </div>
);

DepartureTime.displayName = 'DepartureTime';

DepartureTime.propTypes = {
  className: PropTypes.string,
  canceled: PropTypes.bool,
  currentTime: PropTypes.number.isRequired,
  departureTime: PropTypes.number.isRequired,
  realtime: PropTypes.bool,
  style: PropTypes.object,
  useUTC: PropTypes.bool,
  showCancelationIcon: PropTypes.bool,
  departureDelay: PropTypes.number,
  displayOriginalTime: PropTypes.bool,
};

DepartureTime.defaultProps = {
  className: '',
  canceled: false,
  realtime: false,
  useUTC: false,
  showCancelationIcon: false,
  displayOriginalTime: false,
};

DepartureTime.contextTypes = {
  config: PropTypes.object.isRequired,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default DepartureTime;

/**
 * maps stoptime to data structure required by DepartureTime. This is copied
 * from departure-list-container.
 *
 *  @param stoptime stoptime from graphql
 *  @param pattern pattern from graphql
 */

export const mapStopTime = (stoptime, pattern) => ({
  stop: stoptime.stop,
  canceled: stoptime.realtimeState === 'CANCELED',
  departureTime:
    stoptime.serviceDay +
    (stoptime.realtimeState === 'CANCELED' || stoptime.realtimeDeparture === -1
      ? stoptime.scheduledDeparture
      : stoptime.realtimeDeparture),
  realtime: stoptime.realtimeDeparture !== -1 && stoptime.realtime,
  pattern: pattern && pattern.pattern,
  trip: stoptime.trip,
  departureDelay: stoptime.departureDelay,
});

/**
 * maps stoptime to DepartureTime component
 *  @param stoptime stoptime from graphql
 *  @param currentTime
 *  @param showCancelationIcon whether an icon should be shown if the departure is canceled.
 *  @param displayOriginalTime whether original time should be shown if there's a delay.
 */
export const fromStopTime = (
  stoptime,
  currentTime,
  showCancelationIcon = true,
  displayOriginalTime = false,
) => (
  <DepartureTime
    currentTime={currentTime}
    {...mapStopTime(stoptime)}
    showCancelationIcon={showCancelationIcon}
    displayOriginalTime={displayOriginalTime}
  />
);
