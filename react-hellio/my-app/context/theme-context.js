import React from 'react';
export const themes = {
	dark: {
		background: 'defaultContext'
	}
};

export const ThemeContext = React.createContext(
	themes.dark // 默认值
);
