import React from 'react';

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = { temperature: '', scale: 'c' };
	}

	handleCelsiusChange(temperature) {
		this.setState({ scale: 'c', temperature });
	}

	handleFahrenheitChange(temperature) {
		this.setState({ scale: 'f', temperature });
	}

	render() {
		const temperature = this.state.temperature;
		const scale = this.state.scale;
		const celsius =
			scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit =
			scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		return (
			<fieldset>
				<div>
					<TemperatureInput
						scale='c'
						temperature={celsius}
						onTemperatureChange={this.handleCelsiusChange}
					/>
					<TemperatureInput
						scale='f'
						temperature={fahrenheit}
						onTemperatureChange={this.handleFahrenheitChange}
					/>
				</div>

				<BoilingVerdict celsius={parseFloat(temperature)} />
			</fieldset>
		);
	}
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const scaleNames = {
			c: 'Celsius',
			f: 'Fahrenheit'
		};
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
}

function toCelsius(fahrenheit) {
	// 摄氏度
	return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
	//华氏度
	return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
	//当输入 temperature 的值无效时，函数返回空字符串，反之，则返回保留三位小数并四舍五入
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

export default Calculator;
