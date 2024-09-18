import clsx from 'clsx';

import styles from './Loader.module.scss';

type LoaderProps = {
  size?: 'md' | 'sm';
};

const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  return <span className={clsx(styles.loader, styles[size])} />;
};

export default Loader;
