import * as ScrollArea from '@radix-ui/react-scroll-area';

import styles from './ScrollAreaCustom.module.scss';

type ScrollAreaCustomProps = {
  children: React.ReactNode;
};

const ScrollAreaCustom: React.FC<ScrollAreaCustomProps> = ({ children }) => (
  <ScrollArea.Root className={styles.root}>
    <ScrollArea.Viewport className={styles.viewport}>
      {children}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar className={styles.scrollbar} orientation="vertical">
      <ScrollArea.Thumb className={styles.thumb} />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar className={styles.scrollbar} orientation="horizontal">
      <ScrollArea.Thumb className={styles.thumb} />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner />
  </ScrollArea.Root>
);

export default ScrollAreaCustom;
