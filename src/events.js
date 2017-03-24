// const apiKey = 'AIzaSyCBwX4Bg0NlgNkR1du8uk75a4WuXOynPp8';
// const familyCal = 'natearnold.me_97bisjqa0rb0q6sgchfkvo0v2g%40group.calendar.google.com';
// const adultCal = 'natearnold.me_djmdkhhlncfjps47tb5mutk7t4%40group.calendar.google.com';
//
// const calParams = '/events?key=' + apiKey +
// 	'&orderBy=' + orderBy +
// 	'&singleEvents=' + singleEvents +
// 	'&showDeleted=' + showDeleted +
// 	'&timeMin=' + timeMin;

import request from 'superagent';
import moment from 'moment';

const CALENDAR_ID = 'natearnold.me_97bisjqa0rb0q6sgchfkvo0v2g%40group.calendar.google.com';
const API_KEY = 'AIzaSyCBwX4Bg0NlgNkR1du8uk75a4WuXOynPp8';
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

export function getEvents(callback) {
	request
		.get(url)
		.end((err, resp) => {
			if (!err) {
				const events = [];

				JSON.parse(resp.text).items.map((event) => {
					console.log(event);

					let sTime = event.start.date || event.start.dateTime;
					let eTime = event.end.date || event.end.dateTime;

					let csTime = moment(sTime).toDate();
					let ceTime = moment(eTime).toDate();

					events.push({
						start: csTime,
						end: ceTime,
						title: event.summary,
						description: event.description,
						location: event.location,
					})
				})

				callback(events);
			}
		})
};
