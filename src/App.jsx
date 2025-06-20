import { useRef, useState } from 'react';
import styles from './app.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [passwordRepeatError, setPasswordRepeatError] = useState(null);
	const submitButtonRef = useRef(null);

	const isFormCompleted =
		Boolean(email) &
		Boolean(password) &
		Boolean(passwordRepeat) &
		!emailError &
		!passwordError &
		!passwordRepeatError &
		(password === passwordRepeat)
			? true
			: false;

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
	};

	const onEmailBlur = ({ target }) => {
		let newError = null;
		const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!regexEmail.test(target.value)) {
			newError =
				'Неверный e-mail. Допустимые символы: буквы, цифры и символы ._%+-@';
		}
		setEmailError(newError);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
	};

	const onPasswordBlur = ({ target }) => {
		let newError = null;
		const regexPassword =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*(?=.*[@$!%*?&])).{8,}$/;
		if (!regexPassword.test(target.value)) {
			newError =
				'Неверный пароль. Необходимо не менее 8 символов: цифры, буквы в разных регистрах и символы @$!%*?&';
		}
		setPasswordError(newError);
	};

	const onPasswordRepeatChange = ({ target }) => {
		setPasswordRepeat(target.value);
		if (password === target.value) {
			setPasswordRepeatError('');
			submitButtonRef.current.focus();
		}
	};

	const onPasswordRepeatBlur = ({ target }) => {
		let newError = null;
		if (password !== target.value) {
			newError = 'Неверный пароль. Пароль должен совпадать';
		}
		setPasswordRepeatError(newError);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password, passwordRepeat });
	};

	if (isFormCompleted) {
		setTimeout(() => {
			submitButtonRef.current.focus();
		}, 0);
	}

	return (
		<div className={styles.app}>
			<h1>New user form registration</h1>
			{emailError && <div className={styles.errorLabel}>{emailError}</div>}
			{passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
			{passwordRepeatError && (
				<div className={styles.errorLabel}>{passwordRepeatError}</div>
			)}
			<form onSubmit={onSubmit} className={styles.form}>
				<input
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				/>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				<input
					name="passwordRepeat"
					type="password"
					placeholder="Повторите пароль"
					value={passwordRepeat}
					onChange={onPasswordRepeatChange}
					onBlur={onPasswordRepeatBlur}
				/>
				<button type="submit" ref={submitButtonRef} disabled={!isFormCompleted}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
