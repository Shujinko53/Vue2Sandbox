<template>
	<div class="Form">
		<div class="Form_inputs">
			<div
				v-for="(value, key) in fields"
				:key="key"
				:class="`Form_input-${value.type || 'text'}`"
				class="Form_input"
			>
				<textarea
					v-if="value.type === 'textarea'"
					v-model.trim="values[value.name]"
					:placeholder="value.placeholder"
				>
				</textarea>

				<TheMask
					v-else-if="value.mask"
					v-model="values[value.name]"
					:mask="value.mask"
					:masked="true"
					:placeholder="value.placeholder"
					:type="value.type || 'text'"
				/>

				<input
					v-else
					v-model.trim="values[value.name]"
					:placeholder="value.placeholder"
					:type="value.type || 'text'"
				/>

				<div class="Form_input_line"></div>
			</div>

			<div class="timeInputs">
				<div class="timeInputs_select timeInputs_select-date">
					<div :class="['timeInputs_head', {'open': open.date}, {'filled': choosenDay}]" @click="openCalendar">
						{{ choosenDay ? `${choosenDay} ${endMonthsLetter}` : 'Дд/Мм' }}
						<!--<Icon id="arrow-down" />-->
					</div>
					<div :class="['timeInputs_content', 'timeInputs_content-calendar', {'open': open.date}]">
						<div :class="['timeInputs_content-wrap', 'calendar', {'hidden': !open.date}]">
							<div class="dateWrapper">
								<div class="months">
									<div :class="['months_head', {'open': open.month}]" @click="open.month = !open.month">
										{{ intermediateMonth ? intermediateMonth : currentMonth }}
										<!--<Icon id="triangle-small" />-->
									</div>

									<div :class="['months_content', {'open': open.month}]">
										<div class="months_content-wrap">
											<div
												v-for="(monthsItem, idx) in months"
												:key="idx"
												:class="['months_item', {'active': monthsItem === intermediateMonth}]"
												@click="setValue('month', monthsItem)"
											>
												{{ monthsItem }}
											</div>
										</div>
									</div>
								</div>

								<div class="year">
									{{ currentYear }}
								</div>
							</div>

							<ul class="weekDays">
								<li
									v-for="(day, idx) of weekDays"
									:key="idx"
									class="weekDay"
								>
									{{ day }}
								</li>
							</ul>

							<ul class="calendarDays">
								<li
									v-for="(day, idx) of days"
									:key="idx"
									:class="[
											'calendarDays-item', day.class,
											{'active': day.today}, {'choosen': day.number === choosenDay && choosenMonth === intermediateMonth && day.class === 'filled'},
											{'past': handlerPastDays(day.number, day.class)}
										]"
									@click="handlerCalendarDayClick(day.number, day.class)"
								>
									{{ day.number }}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="timeInputs_select timeInputs_select-time">
					<div :class="['timeInputs_head', {'open': open.time}, {'filled': values.time}]" @click="open.time = !open.time">
						{{ values.time ? values.time : 'Чч:Мм' }}
						<!--<Icon id="arrow-down" />-->
					</div>
					<div :class="['timeInputs_content', {'open': open.time}]">
						<div class="timeInputs_content-wrap">
							<div
								v-for="(time, idx) in timeValues"
								:key="idx"
								:class="['timeInputs_item', {'active': time === values.time}]"
								@click="setValue('time', time)"
							>
								{{ time }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {TheMask} from 'vue-the-mask';

export default {
	name: 'FormVisit',

	components: {
		TheMask,
	},

	props: {
		fields: {
			type: Array,
			default: () => [
				{
					name: 'name',
					required: true,
					placeholder: 'Ваше имя',
				},
				{
					name: 'phone',
					required: true,
					placeholder: '+7',
					mask: '+7(###)###-##-##',
				},
				{
					name: 'auto',
					required: true,
					placeholder: 'Номер автомобиля',
				},
			],
		}
	},

	data() {
		const year = new Date().getFullYear();
		return {
			values: {},
			result: null,
			agreeActive: false,
			choosenMonth: '',
			intermediateMonth: '',
			choosenDay: '',
			currentYear: year,
			open: {
				date: false,
				month: false,
				time: false,
			},
			timeValues: [
				'09:00',
				'09:30',
				'10:00',
				'10:30',
				'11:00',
				'11:30',
				'12:00',
				'12:30',
				'13:00',
				'13:30',
				'14:00',
				'14:30',
				'15:00',
				'15:30',
				'16:00',
				'16:30',
				'17:00',
				'17:30',
				'18:00',
				'18:30',
				'19:00',
			],
			months: [
				'Январь',
				'Февраль',
				'Март',
				'Апрель',
				'Май',
				'Июнь',
				'Июль',
				'Август',
				'Сентябрь',
				'Октябрь',
				'Ноябрь',
				'Декабрь',
			],
			weekDays: [
				'Пн',
				'Вт',
				'Ср',
				'Чт',
				'Пт',
				'Сб',
				'Вс',
			],
			days: [],
		};
	},

	computed: {
		available() {
			return ((!this.agree || this.agreeActive) && !this.sendDisabled) && this.fields.every((item) => {
				const value = this.values[item.name];
				let result = false;

				if (!item.required) {
					result = true;
				}

				if (value) {
					if (item.mask && value.replace(/\d/g, '#') === item.mask.replace(/\d/g, '#')) {
						result = true;
					}
					if ((item.name === 'email' || item.type === 'email') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						result = true;
					}
					if (!item.mask && item.name !== 'email' && item.type !== 'email') {
						result = true;
					}
				}

				return result;
			});
		},
		formClass() {
			if (this.result) {
				return `Form-${this.result}`;
			}
			return 'Form-inputs';
		},
		currentMonth() {
			return this.months[new Date().getMonth()];
		},
		endMonthsLetter() {
			let result = '';

			if (this.choosenMonth) {
				if (this.choosenMonth.split('')[this.choosenMonth.length - 1] === 'ь') {
					result = this.choosenMonth.replace('ь', 'я');
				} else if (this.choosenMonth.split('')[this.choosenMonth.length - 1] === 'й') {
					result = this.choosenMonth.replace('й', 'я');
				} else {
					result = this.choosenMonth.split('');
					result.push('а');
					result = result.join('');
				}
			}

			return result;
		},
	},

	watch: {},

	mounted() {
		this.$nextTick(() => {
			if (this.currentMonth) {
				const currentMonth = new Date().getMonth();
				this.intermediateMonth = this.currentMonth;
				this.generateCalendar(currentMonth, this.currentYear);
			}
		});
	},

	methods: {
		setValue(key, value) {
			if (key === 'month') {
				const currentMonthIndex = this.months.findIndex((item) => item === value);
				this.intermediateMonth = value;
				this.generateCalendar(currentMonthIndex, this.currentYear);
			} else {
				this.values[key] = value;
			}

			this.open[key] = false;
		},

		openCalendar() {
			this.open.month = false;
			this.open.date = !this.open.date;
		},

		isLeapYear(year) {
			return (
				(year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
				(year % 100 === 0 && year % 400 === 0)
			);
		},

		getFebDays(year) {
			return this.isLeapYear(year) ? 29 : 28;
		},

		generateCalendar(month, year) {
			this.days = [];
			const calendarYear = document.querySelector('.year');
			const daysOfMonth = [
				31,
				this.getFebDays(year),
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31,
			];
			const currentDate = new Date();
			calendarYear.innerHTML = year;
			const firstDay = new Date(year, month);
			const lastDateofMonth = new Date(year, month + 1, 0).getDate(); // getting last date of month
			const lastDateofLastMonth = new Date(year, month, 0).getDate(); // getting last date of previous month
			const lastDayofMonth = new Date(year, month, lastDateofMonth).getUTCDay(); // getting last day of month

			for (let i = firstDay.getUTCDay(); i > 0; i--) {
				this.days.push({class: 'previousMonth', number: lastDateofLastMonth - i + 1});
			}

			for (let i = 0; i <= daysOfMonth[month] + firstDay.getUTCDay() - 1; i++) {
				if (i >= firstDay.getUTCDay()) {
					const isToday = i - firstDay.getUTCDay() + 1 === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear() ? ' active' : '';

					this.days.push({class: 'filled', today: isToday, number: i - firstDay.getUTCDay() + 1});
				}
			}

			for (let i = lastDayofMonth; i < 6; i++) {
				this.days.push({class: 'nextMonth', number: i - lastDayofMonth + 1});
			}

			this.handlerCalendarDayClick();
		},

		handlerCalendarDayClick(day, type) {
			if (day && type === 'filled' && !this.handlerPastDays(day, type)) {
				this.choosenDay = Number(day);
				this.choosenMonth = this.intermediateMonth;
				this.open.date = false;
			}
		},

		handlerPastDays(day, type) {
			const currentDate = new Date();
			const index = this.months.findIndex((item) => item === this.intermediateMonth);
			let result = false;
			const condition1 = day < currentDate.getDate() && type !== 'previousMonth' && type !== 'nextMonth' && index === currentDate.getMonth();
			const condition2 = index < currentDate.getMonth();

			if (condition1 || condition2) {
				result = true;
			}

			return result;
		},

		clearChoosenDays() {
			const realDays = document.querySelectorAll('.calendarDays-item.filled');
			realDays.forEach((item) => {
				if (item.classList.contains('choosen')) {
					item.classList.remove('choosen');
				}
			});
		},
	},
}
</script>

<style lang="scss">
.Form {
	position: relative;

	.timeInputs {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		column-gap: 5rem;
		padding-top: 1rem;
		user-select: none;

		&_select {
			position: relative;

			&-date {
				width: 28rem;

				.timeInputs_head {
					justify-content: flex-end;
				}
			}

			&-time {
				width: 16rem;

				.timeInputs_head {
					justify-content: flex-start;
				}
			}
		}

		&_head {
			display: flex;
			align-items: center;
			column-gap: 1.6rem;
			font-size: 5.5rem;
			font-weight: 600;
			line-height: 8.1rem;
			white-space: nowrap;
			color: rgba($black, .2);
			cursor: pointer;

			.Icon {
				flex-shrink: 0;
				color: $gray-300;
				transform: translateY(50%);
				transition: transform .4s ease;
			}

			&.open {
				.Icon {
					transform: translateY(50%) rotate(180deg);
				}
			}

			&.filled {
				color: $black;
			}
		}

		&_content {
			position: absolute;
			top: 80%;
			right: 2rem;
			z-index: 2;
			overflow-y: auto;
			width: 10rem;
			height: 0;
			border-radius: .6rem;
			background-color: $gray-600;
			box-shadow: 0 1px 4px rgba(0, 0, 0, .25);
			transition: height .2s ease;

			&::-webkit-scrollbar {
				width: .8rem; /* в основном для вертикальных полос прокрутки */
				padding-right: 1rem;
			}

			&::-webkit-scrollbar-thumb { /* плашка-бегунок */
				border-radius: 1rem;
				background: $black;
			}

			&::-webkit-scrollbar-track { /* фон */
				border: 3px solid $gray-600;
				background: $gray-400;
			}

			&-wrap {
				display: flex;
				flex-direction: column;
				padding: .5rem 0 1rem;
				box-sizing: border-box;
				font-family: 'Poppins';
				font-size: 1.2rem;
				font-weight: 500;
				line-height: 1.8rem;
				color: $black;
			}

			&-calendar {
				overflow: unset;
				width: 25rem;
				box-sizing: border-box;
				font-size: 1.2rem;
				font-weight: 400;
				line-height: 1.6rem;

				.calendar {
					height: 100%;
					padding: 1.6rem 1.6rem 1.4rem;
					transition: opacity .2s ease;
					cursor: default;

					.dateWrapper {
						display: flex;
						align-items: center;
						justify-content: center;
						column-gap: 2rem;
						margin-bottom: 1.6rem;
						//font-family: 'TT Commons Pro';
						font-size: 1.6rem;
						line-height: 1.8rem;

						.months {
							position: relative;
							cursor: pointer;

							.Icon {
								flex-shrink: 0;
								transform: translateY(-25%) rotate(180deg);
								transition: transform .4s ease;
							}

							&_head {
								display: flex;
								align-items: center;
								justify-content: space-between;
								column-gap: 1.4rem;
								width: 10.6rem;
								padding: .4rem 1rem .4rem;
								box-sizing: border-box;
								border-radius: .6rem .6rem 0 0;
								transition: background .3s ease,
								color .3s ease;

								&.open {
									background-color: $gray-900;
									color: $black;

									.Icon {
										transform: translateY(-50%) rotate(0deg);
									}
								}
							}

							&_content {
								position: absolute;
								top: 1.9rem;
								right: 0;
								z-index: 2;
								overflow: hidden;
								width: 10.6rem;
								height: 0;
								border-radius: 0 0 .6rem .6rem;
								background-color: $gray-900;
								transition: height .2s ease;

								&-wrap {
									display: flex;
									flex-direction: column;
									padding: .5rem 0 1rem;
									box-sizing: border-box;
									//font-family: 'TT Commons Pro';
									color: $black;
								}

								&.open {
									height: 28.1rem;
								}
							}

							&_item {
								padding: .3rem 1.6rem .2rem 1rem;
								border-radius: .4rem;
								white-space: nowrap;
								transition: background .3s ease,
								color .3s ease;

								&:hover,
								&.active {
									background-color: $black;
									color: $white;
								}
							}
						}
					}

					.weekDays {
						display: grid;
						gap: .8rem;
						margin: 0 0 .6rem;
						padding: 0;
						font-size: 1.6rem;
						grid-template-columns: repeat(7, 1fr);

						.weekDay {
							width: 2.2rem;
							height: 2rem;
							margin: 0;
							padding: 0;
							//font-family: 'TT Commons Pro';
							list-style: none;
						}
					}

					&.hidden {
						opacity: 0;
						pointer-events: none;
					}
				}

				.calendarDays {
					display: grid;
					flex-grow: 1;
					gap: .8rem;
					column-gap: .4rem;
					margin: 0;
					padding: 0;
					grid-template: repeat(4, 1fr) / repeat(7, 1fr);

					&-item {
						display: flex;
						align-items: center;
						justify-content: center;
						flex-shrink: 0;
						width: 2.2rem;
						height: 2rem;
						margin: 0;
						border-radius: .4rem;
						background-color: transparent;
						line-height: 1.1;
						list-style: none;
						color: $black;
						transition: background .3s ease,
						color .3s ease;

						&.previousMonth,
						&.nextMonth {
							color: $gray-700;
						}

						&.filled {
							cursor: pointer;

							&:hover {
								background-color: rgba($black, .4);
								color: rgba($white, .8);
							}
						}

						&.past {
							color: $gray-800;
							cursor: default;

							&:hover {
								background-color: transparent;
								color: $gray-800;
							}
						}

						&.active {
							background-color: $black;
							color: $white;
						}

						&.choosen {
							background-color: rgba($black, .4);
							color: rgba($white, .8);
							cursor: default;

							&:hover,
							&.active {
								background-color: rgba($black, .4);
								color: rgba($white, .8);
								cursor: default;
							}
						}
					}
				}
			}

			&.open {
				height: 28rem;
			}
		}

		&_item {
			padding: .4rem 1.8rem .4rem 1rem;
			border-radius: .4rem;
			white-space: nowrap;
			transition: background .3s ease,
			color .3s ease;
			cursor: pointer;

			&:hover,
			&.active {
				background-color: $black;
				color: $white;
			}
		}
	}
}
</style>
