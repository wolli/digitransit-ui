import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Moment from 'moment';
import Icon from './Icon';
import Checkbox from './Checkbox';

export default class CarpoolOffer extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
    config: PropTypes.object.isRequired,
  };

  static propTypes = {
    onToggleClick: PropTypes.func.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
  };

  days = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  };

  isRegularly = false;

  selectedDays = [];

  isFinished = false;

  setFrequency = () => {
    this.isRegularly = document.getElementById('regularly').checked;
    this.forceUpdate();
  };

  updateSelectedDays = day => {
    if (this.selectedDays.includes(day)) {
      this.selectedDays.splice(this.selectedDays.indexOf(day), 1);
    } else {
      this.selectedDays.push(day);
    }
  };

  finishForm = e => {
    e.preventDefault();
    this.isFinished = true;
    this.forceUpdate();

    const carpoolOffer = {
      origin: this.props.from,
      destination: this.props.to,
      phoneNumber: document.getElementById('phone').value,
      time: {
        type: this.isRegularly ? 'recurring' : 'one-off',
        departureTime: new Moment(this.props.start * 1000).format('HH:mm'),
      },
    };

    if (this.isRegularly) {
      carpoolOffer.time.weekdays = this.days;
    } else {
      carpoolOffer.time.date = new Moment(this.props.start * 1000).format(
        'YYYY-MM-DD',
      );
    }

    return carpoolOffer;
  };

  getOfferedTimes = () => {
    let departureDay = '';
    const departureTime = new Moment(this.props.start * 1000).format('HH:mm');
    if (this.isRegularly) {
      // If the offer is recurring, return all the selected days as a string.
      for (let i = 0; i < this.selectedDays.length; i++) {
        departureDay = departureDay.concat(this.selectedDays[i]).concat('s, ');
      }
      departureDay = departureDay.toLowerCase();
      departureDay =
        departureDay.charAt(0).toUpperCase() + departureDay.slice(1);
      departureDay = departureDay.replace(/,(?=[^,]*$)/, '');
    } else {
      // If the offer is one-off, get the date from the epoch time.
      departureDay = new Moment(this.props.start * 1000).format('YYYY-MM-DD');
    }
    return departureDay
      .concat(' ')
      .concat('um') // TODO: translate
      .concat(' ')
      .concat(departureTime)
      .concat('.');
  };

  render() {
    const origin = this.props.from;
    const destination = this.props.to;
    const departure = new Moment(this.props.start * 1000).format('HH:mm');
    const { onToggleClick } = this.props;
    const offeredTimes = this.getOfferedTimes();

    return (
      <div className="customize-search carpool-offer">
        <button className="close-offcanvas" onClick={onToggleClick}>
          <Icon className="close-icon" img="icon-icon_close" />
        </button>
        <Icon className="fg_icon" img="fg_icon" width={12} height={12} />
        {this.isFinished ? (
          <div className="sidePanelText">
            <h2>
              <FormattedMessage id="thank-you" defaultMessage="Thank you" />
            </h2>
            <p>
              <FormattedMessage
                id="carpool-offer-success"
                values={{ origin, destination }}
                defaultMessage="Your offer from {origin} to {destination} was added."
              />
              <br />
              {this.isRegularly ? (
                <FormattedMessage
                  id="chosen-times-recurring"
                  defaultMessage="You've set the following times and days:"
                />
              ) : (
                <FormattedMessage
                  id="chosen-times-once"
                  defaultMessage="You've set the following time:"
                />
              )}
              <br />
              {offeredTimes}
            </p>
            <button
              type="submit"
              className="sidePanel-btn"
              onClick={() => {
                this.isFinished = false;
                this.isRegularly = false;
                this.forceUpdate();
              }}
            >
              <FormattedMessage id="close" defaultMessage="Close" />
            </button>
          </div>
        ) : (
          <form onSubmit={this.finishForm} className="sidePanelText">
            <h2>
              <FormattedMessage
                id="your-carpool-trip"
                defaultMessage="Your trip"
              />
            </h2>
            <p>
              <b>
                <FormattedMessage id="origin" defaultMessage="Origin" />
              </b>
              : {origin} <FormattedMessage id="at-time" defaultMessage="at" />{' '}
              {departure}
              <br />
              <b>
                <FormattedMessage
                  id="destination"
                  defaultMessage="Destination"
                />
              </b>
              : {destination}
            </p>
            <p>
              <FormattedMessage
                id="add-carpool-offer-frequency"
                defaultMessage="How often do you want to add the offer?"
              />
            </p>
            <div>
              <input
                onChange={this.setFrequency}
                type="radio"
                id="once"
                value="once"
                name="times"
                defaultChecked
              />
              <label className="radio-label" htmlFor="once">
                <FormattedMessage id="once" defaultMessage="once" />
              </label>
            </div>
            <div>
              <input
                onChange={this.setFrequency}
                type="radio"
                id="regularly"
                value="regularly"
                name="times"
              />
              <label className="radio-label" htmlFor="regularly">
                <FormattedMessage id="recurring" defaultMessage="recurring" />
              </label>
            </div>
            <Checkbox
              disabled={!this.isRegularly}
              onChange={e => {
                this.updateSelectedDays(
                  e.currentTarget.getAttribute('aria-label'),
                );
                this.days.monday = !this.days.monday;
                this.forceUpdate();
              }}
              checked={this.isRegularly && this.days.monday}
              labelId="monday"
            />
            <Checkbox
              disabled={!this.isRegularly}
              checked={this.isRegularly && this.days.tuesday}
              onChange={e => {
                this.updateSelectedDays(
                  e.currentTarget.getAttribute('aria-label'),
                );
                this.days.tuesday = !this.days.tuesday;
                this.forceUpdate();
              }}
              labelId="tuesday"
            />
            <Checkbox
              disabled={!this.isRegularly}
              checked={this.isRegularly && this.days.wednesday}
              onChange={e => {
                this.updateSelectedDays(
                  e.currentTarget.getAttribute('aria-label'),
                );
                this.days.wednesday = !this.days.wednesday;
                this.forceUpdate();
              }}
              labelId="wednesday"
            />
            <Checkbox
              disabled={!this.isRegularly}
              checked={this.isRegularly && this.days.thursday}
              onChange={e => {
                this.updateSelectedDays(
                  e.currentTarget.getAttribute('aria-label'),
                );
                this.days.thursday = !this.days.thursday;
                this.forceUpdate();
              }}
              labelId="thursday"
            />
            <Checkbox
              disabled={!this.isRegularly}
              checked={this.isRegularly && this.days.friday}
              onChange={e => {
                this.updateSelectedDays(
                  e.currentTarget.getAttribute('aria-label'),
                );
                this.days.friday = !this.days.friday;
                this.forceUpdate();
              }}
              labelId="friday"
            />
            <Checkbox
              disabled={!this.isRegularly}
              checked={this.isRegularly && this.days.saturday}
              onChange={e => {
                this.updateSelectedDays(
                  e.currentTarget.getAttribute('aria-label'),
                );
                this.days.saturday = !this.days.saturday;
                this.forceUpdate();
              }}
              labelId="saturday"
            />
            <Checkbox
              disabled={!this.isRegularly}
              checked={this.isRegularly && this.days.sunday}
              onChange={e => {
                this.updateSelectedDays(
                  e.currentTarget.getAttribute('aria-label'),
                );
                this.days.sunday = !this.days.sunday;
                this.forceUpdate();
              }}
              labelId="sunday"
            />
            <label forHtml="phone"><FormattedMessage id="add-phone-number" defaultMessage="Add your phone number" /></label>
            <br />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123/456-78901"
              pattern="[0-9]{3}\/[0-9]{3}-[0-9]{5}"
              required
            />
            <br />
            <button className="standalone-btn" type="submit">
              <FormattedMessage
                id="offer-ride"
                defaultMessage="Offer carpool"
              />
            </button>
          </form>
        )}
      </div>
    );
  }
}
