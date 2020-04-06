import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const TodaysPlan = ({ dailyData, setDailyData }) => {
	return (
		<Form>
			<Form.Group controlId="title">
				<Form.Control
					style={{ fontSize: `${50}px` }}
					type="text"
					placeholder="Monday, 23.03.20, M3W4D4"
				/>
				<Form.Text className="text-muted">
					Use Day, date, calendar scheme
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="focus">
				<Form.Label className="h2">
					1. What is this month's focus? What is this week's focus?
				</Form.Label>
				<Form.Control
					as="textarea"
					placeholder="This month's/week's focus is..."
				/>
				<Form.Text className="text-muted">
					Write this down in my own words fresh everyday. It gives priority and
					direction for the day. Remember how much time is left for the weekly
					and monthly goals. (5 mins)
				</Form.Text>
			</Form.Group>
		</Form>
	);
};

export default TodaysPlan;
