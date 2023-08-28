import { memo, useContext } from 'react';
import ThemeContext from '../contexts/theme.context';

const Description = () => {

	// console.log('RENDER DESCRIPTION');

	const { theme } = useContext(ThemeContext);

	return (
		<p style={{ padding: 8, backgroundColor: theme === 'light' ? 'transparent' : 'black', color: theme === 'light' ? 'black' : 'whitesmoke' }}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis dicta natus aliquam minima eveniet, error laboriosam omnis facere, nemo hic fugiat autem iusto animi eos maiores deleniti! Dolorum, doloremque maxime.
		</p>
	);
};

export default memo(Description);